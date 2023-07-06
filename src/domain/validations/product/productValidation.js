import z from 'zod';

export const productStockValidation = z.object({
    stock: z.number().min(1),
})