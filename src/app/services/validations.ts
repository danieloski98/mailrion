import { z } from 'zod'

const LoginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
})

const SignupSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty().min(8),
    name: z.string().nonempty().min(3),
})

export { LoginSchema, SignupSchema }