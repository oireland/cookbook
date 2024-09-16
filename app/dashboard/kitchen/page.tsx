import React from 'react';
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import JoinKitchenForm from "@/app/ui/dashboard/kitchen/join-kitchen-form";
import KitchenDetails from "@/app/ui/dashboard/kitchen/kitchen-details";
import {getKitchenDetails} from "@/lib/data";
import InitialiseKitchenForm from "@/app/ui/dashboard/kitchen/initialise-kitchen-form";



async function Page() {
    const session = await auth();

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/dashboard/kitchen')
    }

    const user = session.user

    if (user.kitchenId) {

        const details = await getKitchenDetails(user.kitchenId);


        return (
            <KitchenDetails details={details} userId={user.id!} isCreator={user.role === "CREATOR"}/>
        );
    }

    //Join an existing kitchen --or-- create a new kitchen
    return <div className="space-y-2 p-6 max-w-2xl mx-auto">
        <JoinKitchenForm userId={user.id!}/>
        <div className="flex space-x-2 items-center">
            <hr className="w-full"/>
            <span>or</span>
            <hr className="w-full"/>
        </div>
        <InitialiseKitchenForm userId={user.id!}/>
    </div>;

}

export default Page;