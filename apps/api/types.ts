import { password } from "bun"
import z from "zod"

export const CreateUserInput = z.object({
    email: z.email(),
    password: z.string().min(3,{message: "Password must be 3 characters long!"}),
    name: z.string().min(1,"Name is required")
})


export const SignInInput = z.object({
    email: z.email(),
    password: z.string().min(3,{message: "Password must be 3 characters long!"}),
})