import z from 'zod';

export const roleCreateValidation = z.object({
    name: z.string().min(5).max(20),
    permissions: z.array(z.string().min(5).max(20)).length(0),
});

