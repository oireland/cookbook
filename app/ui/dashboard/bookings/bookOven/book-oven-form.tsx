'use client'
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {BookOvenFormData, BookOvenSchema} from "@/lib/zod-schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {DateTimePicker} from "@/components/ui/datetime-picker";
import DurationPicker from "@/components/ui/duration-picker";
import FormButtons from "@/components/form-buttons";
import {useToast} from "@/hooks/use-toast";
import {bookOven} from "@/lib/actions";

type BookOvenProps = {
    userId: string;
    ovens: {
        id: string;
        displayName: string;
        numberOfShelves: number;
    }[]
}


function BookOvenForm({userId, ovens}: BookOvenProps) {

    const [maxNumberOfShelves, setMaxNumberOfShelves] = useState(ovens[0].numberOfShelves)

    const ONE_HOUR_MS = 60 * 60 * 1000;


    const form = useForm<BookOvenFormData>({
        resolver: zodResolver(BookOvenSchema),
        defaultValues: {
            ovenId: ovens[0].id,
            numberOfShelves: 1,
            temperature: 180,
            startDateTime: undefined,
            duration: ONE_HOUR_MS,
        }
    })

    const bookOvenWithId = bookOven.bind(null, userId);

    const {toast} = useToast();

    async function onSubmit(data: BookOvenFormData) {
        console.log(data)
        const result = await bookOvenWithId(data)

        if (result.success) {
            toast({
                title: "Form submitted successfully.",
                description: "Your booking has been made.",
                duration: 1000
            })
            form.reset()
        } else {
            if (result.isClash){
                toast({
                    title: "There is a clash",
                    description: "There is an existing booking which clashes with your attempted booking.",
                    variant: "destructive",
                    duration: 2000
                })
            } else {
                toast({
                    title: "Error",
                    description: "There was a problem submitting the form.",
                    variant: "destructive",
                    duration: 2000
                })
            }

        }
    }

    function getNumberOfShelvesFromOvenId(ovenId: string) {
        return ovens.filter(({id}) => id === ovenId)[0]?.numberOfShelves
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Book an Oven</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/*Choose Start Date and Time*/}
                        <FormField control={form.control} name={"startDateTime"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Date and Time</FormLabel>
                                <FormControl>
                                    <DateTimePicker className="w-full" value={field.value} onChange={field.onChange}
                                                    granularity="minute" hourCycle={12}/>
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}/>
                        {/*Choose Duration*/}
                        <FormField control={form.control} name={"duration"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                    <DurationPicker value={field.value} onMillisChange={field.onChange}/>
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}/>

                        {/*Select Oven*/}
                        <FormField control={form.control} name={"ovenId"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Oven</FormLabel>
                                <Select onValueChange={(value) => {
                                    setMaxNumberOfShelves(getNumberOfShelvesFromOvenId(value))
                                    field.onChange(value)
                                }} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an oven to book"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {ovens.map(({id, displayName}) => (
                                            <SelectItem key={id} value={id}>{displayName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        {/*Choose Number of Shelves*/}
                        <FormField control={form.control} name={"numberOfShelves"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Number of Shelves (Max {maxNumberOfShelves})</FormLabel>
                                <FormControl>
                                    <Input type="number" value={field.value} onChange={field.onChange}/>
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}/>

                        {/*    Choose Temperature*/}
                        <FormField control={form.control} name={"temperature"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Temperature</FormLabel>
                                <FormControl>
                                    <Input type="number" value={field.value} onChange={field.onChange}/>
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}/>
                        {/*    Submit*/}
                        <FormButtons />
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}

export default BookOvenForm;