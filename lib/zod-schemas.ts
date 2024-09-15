import {z} from "zod";


export const KitchenFormSchema = z.object({
    kitchenName: z.string().min(1, "Kitchen name is required"),
    ovens: z.array(z.object({
        name: z.string().min(1, "Oven name is required"),
        numberOfShelves: z.coerce.number().min(1, "Number of shelves must be at least 1")
    })).min(1, "At least one oven is required"),
    hobs: z.array(z.object({
        name: z.string().min(1, "Hob name is required")
    })).min(1, "At least one hob is required")
})

export type KitchenFormData = z.infer<typeof KitchenFormSchema>
