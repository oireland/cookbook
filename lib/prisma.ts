import { PrismaClient } from "@prisma/client"
import {Pool} from '@neondatabase/serverless'
import {PrismaNeon} from '@prisma/adapter-neon'

const prismaClientSingleton = () => {
    const neon = new Pool({connectionString: process.env.POSTGRES_PRISMA_URL})
    const adapter = new PrismaNeon(neon)
    return new PrismaClient({adapter})
}

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") {globalForPrisma.prisma = prisma}