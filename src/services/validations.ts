import { z } from 'zod'

const LoginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
})

const SignupSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty().min(8),
    name: z.string().nonempty().min(3),
});

const smtpUserSchema = z.object({
    name: z.string().nonempty(),
    password: z.string().nonempty().min(8),
    hostname: z.string().nonempty(),
    username: z.string().nonempty(),
});

export { LoginSchema, SignupSchema, smtpUserSchema }