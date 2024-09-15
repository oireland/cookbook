import React from 'react';
import {auth, signIn} from "@/lib/auth";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";

async function Page({searchParams}: {searchParams?: {callbackUrl?: string}}) {
    const callbackUrl = searchParams?.callbackUrl || '/'
    const session = await auth()
    if (session?.user) redirect('/dashboard')

    return (
        <div>
            Login Page
            <form
                action={async () => {
                    "use server"
                    await signIn("github", {redirectTo: callbackUrl})
                }}
            >
                <Button type="submit">Continue with GitHub</Button>
            </form>
            <form
                action={async () => {
                    "use server"
                    await signIn("google", {redirectTo: callbackUrl})
                }}
            >
                <Button type="submit">Continue with Google</Button>
            </form>
        </div>
    );
}

export default Page;