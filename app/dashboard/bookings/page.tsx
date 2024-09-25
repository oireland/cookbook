import React from 'react';

import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getBookingDetails} from "@/lib/data";
import Agenda from "@/app/ui/dashboard/bookings/agenda";

async function Page() {

    const session = await auth()

    if (!session || !session.user.id) {
        redirect('/api/auth/signin?callbackUrl=/dashboard/bookings')
    }

    if (!session.user.kitchenId) {
        redirect('/dashboard/kitchen')
    }

    const bookings = await getBookingDetails(session.user.kitchenId)

    if (!bookings) {
        return <div>No Bookings</div>
    }

    return (
        <Agenda bookings={bookings}/>
    );
}

export default Page;