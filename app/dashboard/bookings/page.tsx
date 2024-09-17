import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

function Page() {
    return (
        <div>
            <ul className="list-disc">
                <li>This page will display the users own bookings in a list view
                </li>
                <li>Display all bookings in a calendar or list view</li>
                <li> User can edit their own bookings.
                </li>
            </ul>
            <Button asChild>
                <Link href={'/dashboard/bookings/bookOven'} >Book an Oven</Link>
            </Button>
            <Button asChild>
                <Link href={'/dashboard/bookings/bookBurner'} >Book a burner</Link>
            </Button>
        </div>
    );
}

export default Page;