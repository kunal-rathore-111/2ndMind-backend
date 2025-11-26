
import { regex, z } from 'zod';



export const signInSchema = z.object({
    email: z.email().min(4).max(200),
    password: z.string().
        min(4, { message: "Please increase password length" }).
        max(200, { message: "Please decrease password length" }).
        regex(/[a-z]/, { message: "Please include one lowercase character in password" }).
        regex(/[A-Z]/, { message: "Please include one uppercase character in password" }).
        regex(/[0-9]/, { message: "Please include one number as character in password" }).
        regex(/[&%$#@!]/, { message: "Password must contain at least one- &%$#@!" }),
});


export const signUpSchema = signInSchema.extend({
    username: z.string().min(4, { message: "Please increase username length" }).max(200, { message: "Please decrease username length" }),
})
