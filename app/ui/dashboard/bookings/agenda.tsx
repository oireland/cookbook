'use client'

import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import {DateTimePicker} from "@/components/ui/datetime-picker";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {Booking} from "@/lib/data";
import Link from "next/link";

function Agenda({bookings}: { bookings: Booking[] }) { // will accept the bookings in props
    const data = Array.from(bookings);
    // group bookings by day
    const bookingsByDay: Map<string, Booking[]> = new Map();
    data.forEach((booking) => {
        const dateString = booking.start.toLocaleDateString();
        if (bookingsByDay.has(dateString)) {
            // Add booking to the bookings for that day
            bookingsByDay.get(dateString)?.push(booking)
        } else {
            bookingsByDay.set(dateString, [booking])
        }
    })

    const [displayedBookings, setDisplayedBookings] = useState(bookingsByDay)
    const [startDate, setStartDate] = useState(new Date())

    function changeDate(date?: Date) {
        if (!date) date = new Date();
        setStartDate(date);
        setDisplayedBookings(new Map(Array.from(bookingsByDay).filter(([dateString]) => (getDateFromDateString(dateString) > date))))
    }


    return (
        <div className="flex flex-col">
            <div
                className="flex items-center justify-between sticky p-1 top-12 lg:top-16 bg-background w-full">
                <div className="flex items-center space-x-1">
                    <DateTimePicker displayFormat={{hour24: 'PPP'}} granularity="day" value={startDate}
                                    onChange={(date) => changeDate(date)} yearRange={0}/>
                    <Button variant="destructive" onClick={() => changeDate(new Date())}>Today</Button>
                </div>
                <div className="flex space-x-1">
                    <Button asChild variant="secondary">
                        <Link href={'/dashboard/bookings/bookOven'}>Book an Oven</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href={'/dashboard/bookings/bookBurner'}>Book a Burner</Link>
                    </Button>
                </div>
            </div>

            <main
                className="flex-1">{displayedBookings.size ? Array.from(displayedBookings).map(([dateString, bookings]) => {
                const date = getDateFromDateString(dateString)
                const dayOfWeek = date.toLocaleDateString('en-gb', {weekday: "short"})
                const dayOfMonth = date.getDate()
                console.log(dateString)
                return (
                    <div className="grid grid-cols-8 space-x-5 space-y-4" key={dateString} id={dateString}>
                        <div className="p-2">
                            <div className="text-center w-full text-muted-foreground">{dayOfWeek}</div>
                            <div
                                className={cn("text-center", isDateToday(date) && "mx-auto bg-destructive text-destructive-foreground rounded-full h-10 w-10 flex justify-center items-center text-center")}>{dayOfMonth}</div>
                        </div>
                        <div className="col-span-7 space-y-1">
                            {bookings.map((booking) => {
                                const startTime = booking.start.toLocaleTimeString().slice(0, -3);
                                const endTime = booking.end.toLocaleTimeString().slice(0, -3);
                                return (
                                    <div className="p-2 rounded-md border border-muted" key={booking.id}>
                                        <h2 className="text-lg font-semibold">{booking.name}</h2>
                                        <p className="text-destructive font-bold">{startTime} - {endTime}</p>
                                        <p className="mt-1">{booking.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }) : (
                <Skeleton className="h-32 items-center justify-center flex">No results.</Skeleton>
            )}</main>
        </div>
    );
}

export default Agenda;

function isDateToday(date: Date) {
    const today = new Date()
    if (date.getFullYear() !== today.getFullYear()) return false
    if (date.getMonth() !== today.getMonth()) return false
    return date.getDate() === today.getDate();
}

function getDateFromDateString(dateString: string) {
    const date = new Date();
    date.setDate(parseInt(dateString.slice(0, 2)))
    date.setMonth(parseInt(dateString.slice(3, 5)) - 1)
    date.setFullYear(parseInt(dateString.slice(6)))
    return date
}

