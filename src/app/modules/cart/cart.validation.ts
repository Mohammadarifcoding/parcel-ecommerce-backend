import { z } from 'zod';

const CartValidationSchema = z.object({
  body: z.object({
    product: z.string(),
    quantity: z.number(),
    isDeleted: z.boolean().default(false),
    isSell: z.boolean().default(false),
  }),
});

const CartUpdateValidationSchema = z.object({
  body: z.object({
    product: z.string().optional(),
    quantity: z.number().optional(),
    isDeleted: z.boolean().optional().default(false),
    isSell: z.boolean().optional().default(false),
  }),
});

export const CartValidation = {
  CartValidationSchema,
  CartUpdateValidationSchema,
};
