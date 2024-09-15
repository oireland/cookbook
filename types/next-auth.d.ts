import {DefaultSession} from "next-auth";
import {Role} from "@prisma/client";


declare module "next-auth" {

    interface Session {
        user: User & DefaultSession["user"];
    }

    interface User {
        role: Role
        kitchenId?: string;
    }
}