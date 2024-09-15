import React from 'react';
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import CreateKitchenForm from "@/app/ui/dashboard/kitchen/create-kitchen-form";

async function Page() {
    const session = await auth();

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/dashboard/kitchen')
    }

    const user = session.user

    if (user.kitchenId) {
        return (
            <div>
                This is your kitchen id: {user.kitchenId}
            </div>
        );
    }

    // Create a new kitchen
    return <CreateKitchenForm userId={user.id!}/>

}

export default Page;