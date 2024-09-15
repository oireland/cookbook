"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {PlusCircle, Trash2} from "lucide-react";
import {createKitchen} from "@/lib/actions";
import {useToast} from "@/hooks/use-toast";
import {KitchenFormData, KitchenFormSchema} from "@/lib/zod-schemas";



function CreateKitchenForm({userId}: { userId: string }) {

    const form = useForm<KitchenFormData>({
        resolver: zodResolver(KitchenFormSchema),
        defaultValues: {
            kitchenName: '',
            ovens: [{name: '', numberOfShelves: 1}],
            hobs: [{name: ''}]
        }
    })

    const {fields: ovenFields, append: appendOven, remove: removeOven} = useFieldArray({
        control: form.control,
        name: "ovens"
    })

    const {fields: hobFields, append: appendHob, remove: removeHob} = useFieldArray({
        control: form.control,
        name: "hobs"
    })

    const createKitchenWithId = createKitchen.bind(null, userId)
    const {toast} = useToast();

    async function onSubmit(data: KitchenFormData) {

        //
        //
        // const formData = new FormData();
        //
        // formData.append("kitchenName", data.kitchenName);
        // formData.append("ovens", JSON.stringify(data.ovens))
        // formData.append("hobs", JSON.stringify(data.hobs))

        const result = await createKitchenWithId(data);

        if (result.success) {
            toast({
                title: "Form submitted successfully.",
                description: "Your kitchen has been created.",
                duration: 1000
            })
        } else {
            toast({
                title: "Error",
                description: "There was a problem submitting the form.",
                variant: "destructive",
                duration: 1000
            })
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Kitchen Configuration
                        </CardTitle>
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
                                        <Input placeholder="A712's Kitchen" {...field} />
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
                        {/*Hobs*/}
                        <div className="space-y-4">
                            <FormLabel>Hobs</FormLabel>
                            {hobFields.map((oven, index) => (
                                <Card key={oven.id}>
                                    <CardContent className="pt-2 space-y-4 relative">
                                        <Button type="button" className="absolute right-2 top-2 text-destructive"
                                                variant="ghost" size="icon" onClick={() => removeHob(index)}>
                                            <Trash2 className="h-5 w-5"/>
                                        </Button>
                                        <div className="block md:flex items-center md:space-x-4">
                                            <div className="flex-grow space-y-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`hobs.${index}.name`}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel>Hob Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Back Right" {...field} />
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
                            <Button type="button" onClick={() => appendHob({name: ''})}
                                    variant="outline" className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4"/> Add Hob
                            </Button>
                        </div>
                        <Button type="submit">Submit</Button>
                    </CardContent>
                </Card>
            </form>

        </Form>
    )
}

export default CreateKitchenForm;