import { z } from 'zod';

const WishlistValidationSchema = z.object({
  body: z.object({
    isDeleted: z.boolean().default(false),
  }),
});

const WishlistUpdateValidationSchema = z.object({
  body: z.object({
    product: z.string().optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const WishlistValidation = {
  WishlistValidationSchema,
  WishlistUpdateValidationSchema,
};
