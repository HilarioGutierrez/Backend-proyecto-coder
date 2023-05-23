import z from 'zod';

export const userValidation = z.object({
    firstName: z.string().min(3).max(20), 
    lastName: z.string().min(3).max(20),
    email:z.string().email(),
    age: z.number().max(100),
    password: z.string(),
});

export const emailValidation = z.object({
    email:z.string().email(),
});

export const singupValidation = z.object({
    email:z.string().email(),
    password: z.string(),
});