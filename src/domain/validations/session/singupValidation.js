import z from 'zod';

export const singupValidation = z.object({
    email:z.string().email(),
    password: z.string(),
});