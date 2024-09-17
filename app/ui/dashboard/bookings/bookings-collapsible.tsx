'use client'

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DataTable} from "@/app/ui/dashboard/bookings/data-table";
import {Booking, columns} from "@/app/ui/dashboard/bookings/columns";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {ChevronsUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";


function BookingsCollapsible({bookingData, title, startOpen = false}: { bookingData: Booking[], title: string, startOpen?: boolean }) {

    const [isOpen, setIsOpen] = useState(startOpen)

    return (
        <Card className="">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CardHeader>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-fit space-x-2">
                                <CardTitle>{title}</CardTitle>
                                <ChevronsUpDown/>
                            </Button>
                        </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent><CardContent>
                    <DataTable data={bookingData} columns={columns}/>
                </CardContent></CollapsibleContent>
            </Collapsible>
        </Card>
    );
}

export default BookingsCollapsible;