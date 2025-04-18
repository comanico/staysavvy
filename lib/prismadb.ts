import { PrismaClient } from '@prisma/client'

declare global { // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prismadb
}
 
export default prismadb;