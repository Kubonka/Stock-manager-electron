import { PrismaClient } from '@prisma/client'

/* eslint-disable no-var */
declare global {
  var prisma: PrismaClient | undefined
}
/* eslint-enable no-var */

const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma
// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
// 	return new PrismaClient();
// };

// declare global {
// 	var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
// export default prisma;
