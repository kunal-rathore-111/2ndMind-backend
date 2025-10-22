
import { z } from 'zod';

export const contentZodSchema = z.object({
    title: z.string().min(4).max(1000),
    link: z.url().min(3).max(5000).optional(),
    type: z.string(),
    discription: z.string().min(3).max(400).optional(),
    tags: z.undefined()
    //need to validate tags
});

export const contentValidator = (data: z.infer<typeof contentZodSchema>) => {
    return contentZodSchema.safeParse(data);
}