import React from 'react';
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import GithubSignIn from "@/app/ui/login/github-sign-in";
import GoogleSignIn from "@/app/ui/login/google-sign-in";

async function Page({searchParams}: { searchParams?: { callbackUrl?: string } }) {
    const callbackUrl = searchParams?.callbackUrl || '/'
    const session = await auth()
    if (session?.user) redirect('/dashboard')

    return (
        <div className="w-1/2 mx-auto items-center justify-center p-3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>

                    <div className="space-y-2 w-min mx-auto">
                        <GithubSignIn callbackUrl={callbackUrl}/>
                        <GoogleSignIn callbackUrl={callbackUrl}/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Page;