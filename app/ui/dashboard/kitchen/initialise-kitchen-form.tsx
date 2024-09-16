'use client'

import React from 'react';
import {useForm} from "react-hook-form";
import {InitialiseKitchenFormData, InitialiseKitchenFormSchema} from "@/lib/zod-schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {initialiseKitchen} from "@/lib/actions";
import {useToast} from "@/hooks/use-toast";

function InitialiseKitchenForm({userId}: { userId: string }) {

    const form = useForm<InitialiseKitchenFormData>({
        resolver: zodResolver(InitialiseKitchenFormSchema),
        defaultValues: {
            kitchenName: '',

        }
    })

    const initialiseKitchenWithId = initialiseKitchen.bind(null, userId)

    const {toast} = useToast();

    async function onSubmit(data: InitialiseKitchenFormData) {
        const result = await initialiseKitchenWithId(data);

        if (result.success) {
            toast({
                title: "Form submitted successfully.",
                description: "You have created a new kitchen.",
                duration: 1000
            })

        } else {
            toast({
                title: "Error",
                description: "There was a problem trying to create the kitchen.",
                variant: "destructive",
                duration: 1000
            })
        }
    }

    return (<Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Set Up a New Kitchen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/*Kitchen Name*/}
                        <FormField
                            control={form.control}
                            name="kitchenName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Kitchen Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E.g. A712's Kitchen" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                            Continue
                            <ArrowRight/>
                        </Button>
                        </div>
                    </CardContent>

                </Card>
            </form>
        </Form>
    );
}

export default InitialiseKitchenForm;