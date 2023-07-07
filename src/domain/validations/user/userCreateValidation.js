import z from 'zod';

export const userCreateValidation = z.object({
    firstName: z.string().min(3).max(20), 
    lastName: z.string().min(3).max(20),
    email:z.string().email(),
    age: z.number().max(100),
    password: z.string().min(8)
});
