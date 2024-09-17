'use client'
import React from 'react';
import {useForm} from "react-hook-form";
import {BookBurnerFormData, BookBurnerSchema} from "@/lib/zod-schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DateTimePicker} from "@/components/ui/datetime-picker";
import DurationPicker from "@/components/ui/duration-picker";
import FormButtons from "@/components/form-buttons";
import {useToast} from "@/hooks/use-toast";
import {bookBurner} from "@/lib/actions";

type BookOvenProps = {
    userId: string;
    burners: {
        id: string;
        displayName: string;
    }[]
}


function BookBurnerForm({userId, burners}: BookOvenProps) {

    const ONE_HOUR_MS = 60 * 60 * 1000;


    const form = useForm<BookBurnerFormData>({
        resolver: zodResolver(BookBurnerSchema),
        defaultValues: {
            burnerId: burners[0].id,
            startDateTime: undefined,
            duration: ONE_HOUR_MS,
        }
    })

    const bookBurnerWithId = bookBurner.bind(null, userId);

    const {toast} = useToast();

    async function onSubmit(data: BookBurnerFormData) {
        console.log(data)
        const result = await bookBurnerWithId(data)

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

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Book a Hob Burner</CardTitle>
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

                        {/*Select Burner*/}
                        <FormField control={form.control} name={"burnerId"} render={({field}) => (
                            <FormItem>
                                <FormLabel>Burner</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an oven to book"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {burners.map(({id, displayName}) => (
                                            <SelectItem key={id} value={id}>{displayName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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

export default BookBurnerForm;