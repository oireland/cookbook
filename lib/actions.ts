'use server'

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {
    CreateCookerFormData, CreateCookerFormSchema,
    InitialiseKitchenFormData, InitialiseKitchenFormSchema,
    JoinKitchenFormData,
    JoinKitchenFormSchema
} from "@/lib/zod-schemas";
import {auth} from "@/lib/auth";


function generateShortCode(length = 8) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function initialiseKitchen(userId: string, formData: InitialiseKitchenFormData) {

    const session = await auth();

    if (!session || session.user.id !== userId) {
        return {success: false, message: "Unauthorised request."}
    }

    const validatedFields = InitialiseKitchenFormSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {success: false, errors: validatedFields.error.flatten().fieldErrors}
    }

    const {kitchenName} = validatedFields.data;

    try {
        let shortCode = '';
        let isUnique = false;

        while (!isUnique) {
            shortCode = generateShortCode();

            const existingKitchen = await prisma.kitchen.findUnique({
                where: {
                    shortCode: shortCode,
                }
            })

            if (!existingKitchen) {
                isUnique = true;
            }
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: "CREATOR",
                kitchen: {
                    create: {
                        name: kitchenName,
                        shortCode: shortCode,
                    }
                }
            }
        })


    } catch (error) {
        console.log(error)
        return {success: false, message: "Something went wrong."}
    }

    revalidatePath('/dashboard/kitchen')
    return {success: true, message: "Successfully created new kitchen."}
}

export async function createCooker(kitchenId: string, formData: CreateCookerFormData) {

    const session = await auth();

    if (!session || session.user.kitchenId !== kitchenId || session.user.role !== "CREATOR") {
        return {success: false, message: "Unauthorised request."}
    }

    const validatedFields = CreateCookerFormSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {success: false, errors: validatedFields.error.flatten().fieldErrors}
    }

    const {cookerName, ovens, burners} = validatedFields.data;

    try {
        await prisma.cooker.create({
            data: {
                name: cookerName,
                ovens: {
                    createMany: {
                        data: ovens,
                    }
                },
                burners: {
                    createMany: {
                        data: burners

                    }
                },
                kitchenId: kitchenId
            }
        })
    } catch (e) {
        console.log(e)
        return {success: false, message: "Something went wrong."}
    }
    revalidatePath('/dashboard/kitchen/addCooker')
    return {success: true, message: "Successfully added cooker."}

}


export async function joinKitchen(userId: string, formData: JoinKitchenFormData) {

    const session = await auth();

    if (!session || session.user.id !== userId) {
        return {success: false, message: "Unauthorised request."}
    }

    const validatedFields = JoinKitchenFormSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {success: false, errors: validatedFields.error.flatten().fieldErrors}
    }

    const {shortCode} = validatedFields.data

    try {

        await prisma.user.update({
            where: {
                id: userId,
                kitchenId: null,
            },
            data: {
                kitchen: {
                    connect: {
                        shortCode: shortCode
                    }
                }
            }
        })


    } catch (error) {
        console.log(error)
        return {success: false, message: "Something went wrong."}
    }

    revalidatePath('/dashboard/kitchen')
    return {success: true, message: "Successfully joined kitchen."}

}

export async function leaveKitchen(userId: string) {
    const session = await auth();

    if (!session || session.user.id !== userId) {
        return {success: false, message: "Unauthorised request."}
    }


    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                kitchenId: null,
            }
        })

        // Delete empty kitchens
        await prisma.kitchen.deleteMany({
            where: {
                users: {
                    none: {
                    }
                }
            }
        })

    } catch (e) {
        console.log('LeaveKitchen Error: ', e);
        return {success: false, message: "Something went wrong."}
    }

    revalidatePath('/dashboard/kitchen');
    return {success: true, message: "Successfully left kitchen."}
}

export async function deleteCooker(cookerId: string) {
    const session = await auth();

    if (!session) {
        return {success: false, message: "Unauthorised request."}
    }

    try {
        await prisma.cooker.delete({
            where: {
                id: cookerId,
                kitchen: {
                    users: {
                        some: {
                            id: session.user.id,
                            role: "CREATOR"
                        }
                    }
                }
            }
        })
    } catch (e) {
        console.log(e);
        return {success: false, message: 'Something went wrong.'}
    }

    revalidatePath('/dashboard/kitchen');
    return {success: true, message: 'Successfully deleted cooker.'}
}