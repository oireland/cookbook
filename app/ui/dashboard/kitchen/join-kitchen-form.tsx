'use client'

import React from 'react';
import {useForm} from "react-hook-form";
import {JoinKitchenFormData, JoinKitchenFormSchema} from "@/lib/zod-schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {joinKitchen} from "@/lib/actions";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";

function JoinKitchenForm({userId} : {userId: string}) {

    const form = useForm<JoinKitchenFormData>({
        resolver: zodResolver(JoinKitchenFormSchema),
        defaultValues: {
            shortCode: ''
        }
    })

    const joinKitchenWithId = joinKitchen.bind(null, userId)

    const {toast} = useToast();

    async function onSubmit(data: JoinKitchenFormData) {
        console.log(data)
        const result = await joinKitchenWithId(data);

        if (result.success) {
            toast({
                title: "Form submitted successfully.",
                description: "You have joined the kitchen.",
                duration: 1000
            })
        } else {
            toast({
                title: "Error",
                description: "There was a problem trying to join the kitchen.",
                variant: "destructive",
                duration: 1000
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" max-w-2xl mx-auto ">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Join an Existing Kitchen
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    {/*    Kitchen Code*/}
                        <FormField control={form.control} name="shortCode" render={({field}) => (
                            <FormItem>
                                <FormLabel>Enter Kitchen Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Kitchen Code" {...field} />
                                </FormControl>
                            </FormItem>
                        )}/>
                        <div className="flex justify-end"><Button type="submit">Join</Button></div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}

export default JoinKitchenForm;