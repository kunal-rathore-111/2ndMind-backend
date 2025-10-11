
import { z } from 'zod';

export const signSchema = z.object({
    username: z.string().min(4, { message: "Please increase username length" }).max(200, { message: "Please decrease username length" }),
    password: z.string().
        min(4, { message: "Please increase password length" }).
        max(200, { message: "Please decrease password length" }).
        refine((val: string) => /[a-z]/.test(val), { message: "Please include one lowercase character in password" }).
        refine((val: string) => /[A-Z]/.test(val), { message: "Please include one lowercase character in password" }).
        refine((val: string) => /[0-9]/.test(val), { message: "Please include one lowercase character in password" })
});

export function signValidator(data: object) {
    return signSchema.safeParse(data);
}
