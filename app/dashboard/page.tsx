import React from 'react';
import {auth} from "@/lib/auth";
import {redirect} from 'next/navigation'

async function Page() {
    const session = await auth()

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/dashboard')
    }
    return (
        <main className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        </main>
    );
}

export default Page;