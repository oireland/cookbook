'use client'

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {leaveKitchen} from "@/lib/actions";
import {useToast} from "@/hooks/use-toast";
import Link from "next/link";
import CookerDetails from "@/app/ui/dashboard/kitchen/cooker-details";
import {Skeleton} from "@/components/ui/skeleton";

type KitchenDetails =
    {
        shortCode: string
        name: string
        cookers: {
            id: string;
            name: string,
            burners: { name: string }[]
            ovens: { name: string, numberOfShelves: number }[]
        }[]
    } | null

function KitchenDetails({details, userId, isCreator}: { details: KitchenDetails, userId: string, isCreator: boolean }) {

    const {toast} = useToast();


    if (!details) {
        return null;
    }


    async function onButtonClick() {
        const result = await leaveKitchen(userId);
        if (result.success) {
            toast({
                title: "Success.",
                description: "You have left the kitchen.",
                duration: 1000
            })
        } else {
            toast({
                title: "Error",
                description: "There was a problem leaving the kitchen.",
                variant: "destructive",
                duration: 1000
            })
        }
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="lg:text-3xl">{details.name}</CardTitle>
                    <CardDescription className="lg:text-base">Your kitchen code
                        is: {details.shortCode}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2 lg:space-y-4">
                    {details.cookers.length ? details.cookers.map((cooker, index) => (
                        <CookerDetails cooker={cooker} key={`cooker-${index}`} />
                    )) : (
                        <Skeleton className="h-32 flex items-center justify-center">Your kitchen has no cookers.</Skeleton>
                    )}

                    {isCreator && <Button asChild>
                        <Link href="/dashboard/kitchen/addCooker">Add a cooker</Link>
                    </Button>}

                </CardContent>
            </Card>
            <div className="w-full flex justify-end mt-2">
                <Button variant="destructive" onClick={onButtonClick}>Leave Kitchen</Button>
            </div>
        </div>
    );
}

export default KitchenDetails;