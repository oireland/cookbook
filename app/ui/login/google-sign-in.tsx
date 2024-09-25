import React from 'react';
import {signIn} from "@/lib/auth";
import {Button} from "@/components/ui/button";
import Image from "next/image";

function GoogleSignIn({callbackUrl}: { callbackUrl: string }) {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google", {redirectTo: callbackUrl})
            }}
        >
            <Button className="space-x-2" type="submit">
                <span>Continue with Google</span>
                <Image src={'/google-logo.png'} alt={"google logo"} width={25} height={25}/>

            </Button>
        </form>
    );
}

export default GoogleSignIn;