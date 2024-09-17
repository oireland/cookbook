import React from 'react';
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getBurnerDetails} from "@/lib/data";
import BookHobForm from "@/app/ui/dashboard/bookings/bookBurner/book-burner-form";

async function Page() {

    const session = await auth()

    if (!session || !session.user.id) {
        redirect('/api/auth/signin?callbackUrl=/dashboard/bookings/bookOven')
    }

    if (!session.user.kitchenId) {
        redirect('/dashboard/kitchen')
    }

    const burnerDetails = await getBurnerDetails(session.user.kitchenId);

    if (!burnerDetails) {
        redirect('/dashboard/kitchen')
    }


    return (
        <div className="p-2">
            <BookHobForm burners={burnerDetails} userId = {session.user.id} />
        </div>
    );
}

export default Page;