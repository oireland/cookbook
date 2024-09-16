'use client'
import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {deleteCooker} from "@/lib/actions";
import {useToast} from "@/hooks/use-toast";

type Cooker = {
    id: string;
    name: string;
    ovens: {
        name: string;
        numberOfShelves: number;
    }[];
    burners: { name: string }[];
}



function CookerDetails({cooker}: {cooker: Cooker}) {

    const {toast} = useToast();

    async function deleteCookerOnClick() {
        const result = await deleteCooker(cooker.id);

        if (result.success) {
            toast({
                title: "Cooker deleted successfully.",
                description: "Your cooker has been deleted.",
                duration: 1000
            })
        } else {
            toast({
                title: "Error",
                description: "There was a problem deleting the cooker.",
                variant: "destructive",
                duration: 1000
            })
        }
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center"><CardTitle
                    className="text-xl lg:text-2xl font-semibold">{cooker.name}</CardTitle>
                    <Button type="button" className="text-destructive"
                            variant="ghost" size="icon"
                            onClick={deleteCookerOnClick}>
                        <Trash2 className="h-5 w-5"/>
                    </Button></div>
            </CardHeader>
            <CardContent className="space-y-2 lg:space-y-0 lg:grid lg:grid-cols-2">
                <div>
                    <h2 className="text-lg lg:text-xl">Ovens:</h2>
                    <ul className='list-disc'>
                        {cooker.ovens.map((oven, index) => (
                            <li className="text-sm" key={`oven-${index}`}>
                                <p>{oven.name} - {oven.numberOfShelves} {oven.numberOfShelves === 1 ? 'Shelf' : 'Shelves'}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg lg:text-xl ">Burners:</h2>
                    <ul className="list-disc">
                        {cooker.burners.map((burner, index) => (
                            <li className="text-sm" key={`burner-${index}`}>
                                <h3>{burner.name}</h3>

                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}

export default CookerDetails;