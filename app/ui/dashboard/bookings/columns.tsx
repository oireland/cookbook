"use client"

import {ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import {Button} from "@/components/ui/button";
import {z} from 'zod'

export type Booking = {
    userName: string | null;
    burnerName: string | undefined;
    ovenName: string | undefined;
    cookerName: string | undefined;
    temperature: number | null;
    numberOfShelves: number | null;
    start: Date;
    end: Date;
}

function formatOvenInfo(ovenName: string, numberOfShelves: number | null, temperature: number | null) {
    return `${ovenName} using ${numberOfShelves} ${numberOfShelves === 1 ? "shelf" : "shelves"} @ ${temperature}`
}

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "userName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "cookerName",
        header: "Cooker",
    },
    {
        accessorKey: "start",
        id: "startDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const start = row.original.start
            return <div>{start.toLocaleDateString()}</div>
        },
        filterFn: (row, columnId, filterValue) => {
            const rowStartDate = row.original.start;
            const filterDate = z.date().parse(filterValue)
            return filterDate.toLocaleDateString() == rowStartDate.toLocaleDateString()
        }
    },
    {
        accessorKey: "start",
        id: 'startTime',
        header: "Start",
        cell: ({row}) => {
            const start = row.original.start
            return <div>{formatTime(start)}</div>
        }
    },
    {
        accessorKey: "end",
        header: "End",
        cell: ({row}) => {
            const end = row.original.end
            return <div>{formatTime(end)}</div>
        }
    },
    {
        id: "ovenOrBurnerInfo",
        header: "Info",
        cell: ({row}) => {
            const {burnerName, ovenName, numberOfShelves, temperature} = row.original;
            if (burnerName) return <div>{burnerName} Burner</div>
            if (ovenName) return <div>{formatOvenInfo(ovenName, numberOfShelves, temperature)}</div>
        }
    }
]

function formatTime(time: Date) {
    const hours = time.getHours()
    const minutes = time.getMinutes()

    if (hours === 12 && minutes === 0) {
        return '12:00 Noon'
    }

    if (hours === 0 && minutes === 0) {
        return '12:00 Midnight'
    }

    if (hours === 12) {
        return `12:${minutes} PM`
    }

    if (hours > 12) {
        return `${hours - 12}:${minutes} PM`;
    }

    return `${hours}:${minutes} AM`
}
