import React from 'react';
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import BookOvenForm from '@/app/ui/dashboard/bookings/bookOven/book-oven-form';
import {getOvenDetails} from "@/lib/data";

async function Page() {

    const session = await auth()

    if (!session || !session.user.id) {
        redirect('/api/auth/signin?callbackUrl=/dashboard/bookings/bookOven')
    }

    if (!session.user.kitchenId) {
        redirect('/dashboard/kitchen')
    }

    const ovenDetails = await getOvenDetails(session.user.kitchenId);

    if (!ovenDetails) {
        redirect('/dashboard/kitchen')
    }


    return (
        <div className="p-2">
            <BookOvenForm ovens={ovenDetails} userId = {session.user.id} />
        </div>
    );
}

export default Page;