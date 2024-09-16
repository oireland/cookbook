import prisma from "@/lib/prisma";

export async function getKitchenDetails(kitchenId: string) {
    try {
        return await prisma.kitchen.findUnique({
            where: {
                id: kitchenId,
            },
            select: {
                name: true,
                cookers: {
                    select: {
                        id: true,
                        name: true,
                        ovens: {
                            select: {
                                name: true,
                                numberOfShelves: true,
                            }
                        },
                        burners: {
                            select: {
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