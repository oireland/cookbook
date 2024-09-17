'use client'

import React from 'react';
import {useFieldArray, useForm} from "react-hook-form";
import {CreateCookerFormData, CreateCookerFormSchema} from "@/lib/zod-schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {createCooker} from "@/lib/actions";
import {useToast} from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {PlusCircle, Trash2} from "lucide-react";
import Image from "next/image";
import FormButtons from "@/components/form-buttons";


function CreateCookerForm({kitchenId}: { kitchenId: string }) {

    const form = useForm<CreateCookerFormData>({
        resolver: zodResolver(CreateCookerFormSchema),
        defaultValues: {
            cookerName: '',
            ovens: [{
                name: '',
                numberOfShelves: 1,
            }],
            burners: [{
                name: ''
            }]
        }
    })

    const {fields: ovenFields, append: appendOven, remove: removeOven} = useFieldArray({
        control: form.control,
        name: "ovens"
    })

    const {fields: burnerFields, append: appendBurner, remove: removeBurner, replace: replaceBurners} = useFieldArray({
        control: form.control,
        name: "burners"
    })

    const createCookerWithId = createCooker.bind(null, kitchenId);
    const {toast} = useToast()

    async function onSubmit(data: CreateCookerFormData) {

        const result = await createCookerWithId(data);

        if (result.success) {
            toast({
                title: "Form submitted successfully.",
                description: "Your cooker has been added.",
                duration: 1000
            })
            form.reset()
        } else {
            toast({
                title: "Error",
                description: "There was a problem submitting the form.",
                variant: "destructive",
                duration: 1000
            })
        }
    }

    function select2Burners () {
        replaceBurners([{name: "Left"}, {name: "Right"}])
    }

    function select4Burners () {
        replaceBurners([{name: "Front Left"}, {name: "Front Right"}, {name: "Rear Left"}, {name: "Rear Right"}])
    }

    function select5Burners () {
        replaceBurners([{name: "Front Left"}, {name: "Front Right"}, {name: "Rear Left"}, {name: "Rear Right"}, {name: "Centre"}])
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto ">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Add a New Cooker
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/*Cooker Name*/}
                        <FormField
                            control={form.control}
                            name="cookerName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Cooker Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E.g. Cooker by the fridge" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/*Ovens*/}
                        <div className="space-y-4">
                            <FormLabel>Ovens</FormLabel>
                            {ovenFields.map((oven, index) => (
                                <Card key={oven.id}>
                                    <CardContent className="pt-2 space-y-4 relative">
                                        <Button type="button" className="absolute right-2 top-2 text-destructive"
                                                variant="ghost" size="icon" onClick={() => removeOven(index)}>
                                            <Trash2 className="h-5 w-5"/>
                                        </Button>
                                        <div className="block md:flex items-center md:space-x-4">
                                            <div className="flex-grow space-y-2"><FormField
                                                control={form.control}
                                                name={`ovens.${index}.name`}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Oven Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Top Oven" {...field} />
                                                        </FormControl>

                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            /></div>

                                            <div className="flex-grow space-y-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`ovens.${index}.numberOfShelves`}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel>Number of Shelves</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="" type={"number"} {...field} />
                                                            </FormControl>

                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <Button type="button" onClick={() => appendOven({name: '', numberOfShelves: 1})}
                                    variant="outline" className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4"/> Add Oven
                            </Button>
                        </div>
                        {/*Burners*/}
                        <div className="space-y-4">
                            <FormLabel>Burners</FormLabel>
                            {/*Template buttons*/}
                            <div className="flex justify-evenly">
                                <Button onClick={() => select2Burners()} type="button" className="h-16 w-16  lg:h-24 lg:w-24 relative" variant="destructive">
                                <Image src={'/2-hob-white.png'}
                                       alt={"A hob with 2 burners"} fill className="object-cover p-1"/>
                                </Button>
                                <Button onClick={() => select4Burners()} type="button" className="h-16 w-16 lg:h-24 lg:w-24 relative" variant="destructive">
                                    <Image src={'/4-hob-white.png'}
                                           alt={"A hob with 4 burners"} fill className="object-cover p-1"/>
                                </Button>
                                <Button onClick={() => select5Burners()} type="button" className="h-16 w-16 lg:h-24 lg:w-24 relative" variant="destructive">
                                    <Image src={'/5-hob-white.png'}
                                           alt={"A hob with 5 burners"} fill className="object-cover p-1"/>
                                </Button>
                                <Button onClick={() => replaceBurners([{name: ''}])} type="button" className="h-16 w-16 lg:h-24 lg:w-24 relative" variant="destructive">
                                    Custom
                                </Button>
                            </div>
                            {/*Burner name inputs*/}
                            <div className="block lg:grid lg:grid-cols-2">
                                {burnerFields.map((burner, index) => (
                                    <Card key={burner.id} className="m-1">
                                        <CardContent className="pt-2 space-y-4 relative">

                                            <div className="block md:flex items-center md:space-x-4">
                                                <div className="flex-grow space-y-2">
                                                    <FormField
                                                        control={form.control}
                                                        name={`burners.${index}.name`}
                                                        render={({field}) => (
                                                            <FormItem >
                                                                <FormLabel>Name</FormLabel>
                                                                <div className="flex items-center justify-between"><FormControl>
                                                                    <Input placeholder="Back Right" {...field} />
                                                                </FormControl>
                                                                    <Button type="button" className="text-destructive"
                                                                            variant="ghost" size="icon"
                                                                            onClick={() => removeBurner(index)}>
                                                                        <Trash2 className="h-5 w-5"/>
                                                                    </Button></div>
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <Button type="button" onClick={() => appendBurner({name: ''})}
                                    variant="outline" className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4"/> Add Burner
                            </Button>
                        </div>
                        <FormButtons />
                    </CardContent>
                </Card>
            </form>

        </Form>
    );
}

export default CreateCookerForm;