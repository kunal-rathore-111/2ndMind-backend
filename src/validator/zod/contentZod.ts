
import { z } from 'zod';


export const contentZodSchema = z.object({
    title: z.string().min(4).max(100),
    link: z.url().min(3).max(1000),
    type: z.enum(['Twitter', 'Youtube', 'Instagram', 'Other']),
    description: z.string().min(3).max(1000).optional(),
    tags: z.array(z.string().max(50)).optional()
    //need to validate tags
});

export const contentValidator = (data: z.infer<typeof contentZodSchema>) => {
    return contentZodSchema.safeParse(data);
}