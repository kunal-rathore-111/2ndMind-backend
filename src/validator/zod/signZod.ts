
import { z } from 'zod';



export const signInSchema = z.object({
    email: z.string().email().min(4).max(200),
    password: z.string().
        min(4, { message: "Please increase password length" }).
        max(200, { message: "Please decrease password length" }).
        regex(/[a-z]/, { message: "Please include one lowercase character in password" }).
        regex(/[A-Z]/, { message: "Please include one uppercase character in password" }).
        regex(/[0-9]/, { message: "Please include one number as character in password" }).
        regex(/[&%$#@!]/, { message: "Password must contain at least one- &%$#@!" }),
});


// For signup, I use the same schema as signin (email + password)
// I'll use email as the username in the database
export const signUpSchema = signInSchema;
