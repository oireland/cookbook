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
                        users: {
                            some: {
                                id: session.user.id
                            }
                        }
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


export type Booking = {
    name: string;
    description: string;
    start: Date;
    end: Date;
    id: string;
}

export async function getBookingDetails(kitchenId: string): Promise<Booking[]> {
    const session = await auth()

    if (!session || session.user.kitchenId !== kitchenId) return [];

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
                },
                id: true,
            },
            orderBy: {
                startDateTime: "asc",
            }
        })

        if (bookings.length == 0) {
            return []
        }

        return bookings.map(({user, oven, burner, numberOfShelves, temperature, startDateTime, endDateTime, id}) => {
            let description = '';
            if (oven) {
                description = `${oven.cooker.name}, ${oven.name} - ${numberOfShelves} ${numberOfShelves! > 1 ? "shelves" : "shelf"} @${temperature}`
            } else if (burner) {
                description = `${burner.cooker.name}, ${burner.name}`
            }
            return ({
                name: user.name!,
                description: description,
                start: startDateTime,
                end: endDateTime,
                id: id
            });
        });
    } catch (e) {
        console.log(e)
        return []
    }
}
