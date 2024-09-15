import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Google from "@auth/core/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, GitHub],
    pages: {
        signIn: "/login"
    }
})