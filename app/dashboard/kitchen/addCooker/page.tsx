import React from 'react';
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import CreateCookerForm from "@/app/ui/dashboard/kitchen/create-cooker-form";

async function Page() {

    const session = await auth();

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/dashboard/kitchen/addCooker');
    }

    if (!session.user.kitchenId) {
        redirect('/dashboard/kitchen')
    }


    return (
        <div className="p-6">
            <CreateCookerForm kitchenId={session.user.kitchenId}/>
        </div>
    );
}

export default Page;