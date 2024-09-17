import React from 'react';

import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getBookingDetails} from "@/lib/data";
import BookingsCollapsible from "@/app/ui/dashboard/bookings/bookings-collapsible";

async function Page() {

    const session = await auth()

    if (!session || !session.user.id) {
        redirect('/api/auth/signin?callbackUrl=/dashboard/bookings')
    }

    if (!session.user.kitchenId) {
        redirect('/dashboard/kitchen')
    }

    const bookingDetails = await getBookingDetails(session.user.kitchenId)

    if (!bookingDetails) {
        return <div>No Bookings</div>
    }

    return (
            <BookingsCollapsible bookingData={bookingDetails} startOpen={true} title="All Bookings"/>

    );
}

export default Page;