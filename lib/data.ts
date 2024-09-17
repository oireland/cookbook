import prisma from "@/lib/prisma";
import {auth} from "@/lib/auth";

export async function getKitchenDetails(kitchenId: string) {

    const session = await auth()

    if (!session || session.user.kitchenId !== kitchenId) return null;


    try {
        return await prisma.kitchen.findUnique({
            where: {
                id: kitchenId,
                users: {
                    some: {
                        id: session.user.id
                    }
                }
            },
            select: {
                name: true,
                cookers: {
                    select: {
                        id: true,
                        name: true,
                        ovens: {
                            select: {
                                id: true,
                                name: true,
                                numberOfShelves: true,
                            }
                        },
                        burners: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                shortCode: true
            }
        })
    } catch (e) {
        console.log('Database Error: ', e);
        throw new Error('Failed to fetch kitchen details.')
    }

}

export async function getOvenDetails(kitchenId: string) {

    const session = await auth()

    if (!session || session.user.kitchenId !== kitchenId) return null;


    try {
        const ovens = await prisma.oven.findMany({
            where: {
                cooker: {
                    kitchen: {
                        id: kitchenId,
                        users: {some: {
                            id: session.user.id
                            }}
                    }
                },
            },
            select: {
                numberOfShelves: true,
                id: true,
                name: true,
                cooker: {
                    select: {
                        name: true,
                    }
                }
            }
        })

        return ovens.map(({name, numberOfShelves, cooker, id}) => ({
            id: id, numberOfShelves: numberOfShelves, displayName: `${cooker.name} - ${name}`
        }))
    } catch (e) {
        console.log('Database Error: ', e);
        throw new Error('Failed to fetch kitchen details.')
    }

}

export async function getBurnerDetails(kitchenId: string) {

    const session = await auth()

    if (!session || session.user.kitchenId !== kitchenId) return null;

    try {
        const burners = await prisma.burner.findMany({
            where: {
                cooker: {
                    kitchen: {
                        id: kitchenId,
                        users: {
                            some: {
                                id: session.user.id
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                name: true,
                cooker: {
                    select: {
                        name: true,
                    }
                }
            }
        })

        return burners.map(({name, id, cooker}) => ({
            id: id,
            displayName: `${cooker.name} - ${name}`,
        }))

    } catch (e) {
        console.log('Database Error: ', e);
        throw new Error('Failed to fetch kitchen details.')
    }

}
