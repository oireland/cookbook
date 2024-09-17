import {z} from "zod";


export const CreateKitchenFormSchema = z.object({
    kitchenName: z.string().min(1, "Kitchen name is required"),
    cookers: z.array(z.object(
        {
            name: z.string().min(1, "Cooker name is required"),
            ovens: z.array(z.object({
                name: z.string().min(1, "Oven name is required"),
                numberOfShelves: z.coerce.number().min(1, "Number of shelves must be at least 1")
            })).min(1, "At least one oven is required"),
            burners: z.array(z.object({
                name: z.string().min(1, "Burner name is required")
            })).min(1, "At least one burner is required")
        }
    ))

})

export type CreateKitchenFormData = z.infer<typeof CreateKitchenFormSchema>

export const CreateCookerFormSchema = z.object({
    cookerName: z.string().min(1, "Cooker name is required"),
    ovens: z.array(z.object({
        name: z.string().min(1, "Oven name is required"),
        numberOfShelves: z.coerce.number().min(1, "Number of shelves must be at least 1")
    })),
    burners: z.array(z.object({
        name: z.string().min(1, "Burner name is required"),
    }))
})

export type CreateCookerFormData = z.infer<typeof CreateCookerFormSchema>;

export const InitialiseKitchenFormSchema= z.object({
    kitchenName: z.string().min(1, "Kitchen name is required"),
})

export type InitialiseKitchenFormData = z.infer<typeof InitialiseKitchenFormSchema>


export const JoinKitchenFormSchema = z.object({
    shortCode: z.string().min(1, "Kitchen code is required"),
})

export type JoinKitchenFormData = z.infer<typeof JoinKitchenFormSchema>;

export const BookOvenSchema = z.object({
    ovenId: z.string().min(1, "Oven is required"),
    numberOfShelves: z.coerce.number().min(1, "Number of shelves must be at least 1"),
    temperature: z.coerce.number().min(1, "Temperature must be positive"),
    startDateTime: z.date().min(new Date(), "Start Date and Time must be in the future."),
    duration: z.number().min(1000 * 60, "Duration must be at least 1 minute")
})

export type BookOvenFormData = z.infer<typeof BookOvenSchema>;

export const BookBurnerSchema = z.object({
    burnerId: z.string().min(1, "Oven is required"),
    startDateTime: z.date().min(new Date(), "Start Date and Time must be in the future."),
    duration: z.number().min(1000 * 60, "Duration must be at least 1 minute")
})

export type BookBurnerFormData = z.infer<typeof BookBurnerSchema>;