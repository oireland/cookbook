import prisma from "@/lib/prisma";
import {auth} from "@/lib/auth";
import {getDisplayName} from "@/lib/utils";

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
            id: id, numberOfShelves: numberOfShelves, displayName: getDisplayName(name, cooker.name)
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
            displayName: getDisplayName(name, cooker.name),
        }))

    } catch (e) {
        console.log('Database Error: ', e);
        throw new Error('Failed to fetch kitchen details.')
    }

}

export async function getBookingDetails(kitchenId: string){
    const session = await auth()

    if (!session || session.user.kitchenId !== kitchenId) return null;

    try {
        const bookings = await prisma.booking.findMany({
            where: {
                user: {
                    kitchenId: kitchenId
                },
                endDateTime: {
                    gt: new Date()
                }
            },
            select: {
                user: {
                    select: {
                        name: true,
                    }
                },
                startDateTime: true,
                endDateTime: true,
                numberOfShelves: true,
                temperature: true,
                oven: {
                    select: {
                        name: true,
                        cooker: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                burner: {
                    select: {
                        name: true,
                        cooker: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                startDateTime: "asc",
            }
        })

        if (bookings.length == 0) {
            return null
        }

        return bookings.map(({user, oven, burner, numberOfShelves, temperature, startDateTime, endDateTime}) => ({
            userName: user.name,
            burnerName: burner?.name,
            ovenName: oven?.name,
            cookerName: burner?.cooker.name || oven?.cooker.name, //Will always be either an oven or a burner so will never actually be 'N/A'
            temperature: temperature,
            numberOfShelves: numberOfShelves,
            start: startDateTime,
            end: endDateTime
        }));
    } catch (e) {
        console.log(e)
        return null
    }
}
