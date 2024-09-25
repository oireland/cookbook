import React from 'react';
import {signIn} from "@/lib/auth";
import {Button} from "@/components/ui/button";
import Image from "next/image";

function GithubSignIn({callbackUrl}: { callbackUrl: string }) {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("github", {redirectTo: callbackUrl})
            }}
        >
            <Button className="space-x-2" type="submit">
                <span>Continue with GitHub</span>
                <Image src={'/github-logo.png'} alt={"github logo"} width={25} height={25}/>
            </Button>
        </form>
    );
}

export default GithubSignIn;