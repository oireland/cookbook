'use server'

import {z} from "zod";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {KitchenFormData, KitchenFormSchema} from "@/lib/zod-schemas";




export async function createKitchen(userId: string, formData: KitchenFormData) {

    const validatedFields = KitchenFormSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {success: false, errors: validatedFields.error.flatten().fieldErrors}
    }

    const {kitchenName, ovens, hobs} = validatedFields.data

    try {

        // Query
        await prisma.user.update({
            where: {
                id: userId,
                kitchenId: null,
            },
            data: {
                role: "CREATOR",
                kitchen: {
                    create: {
                        name: kitchenName,
                        ovens: {
                            createMany: {
                                data: ovens
                            }
                        },
                        hobs: {
                            createMany: {
                                data: hobs
                            }
                        },
                    }
                }
            }
        })


    } catch (error) {
        console.log(error)
        return {success: false, message: "Something went wrong."}
    }

    revalidatePath('/dashboard/kitchen')
    return {success: true, message: "Successfully created kitchen."}

}