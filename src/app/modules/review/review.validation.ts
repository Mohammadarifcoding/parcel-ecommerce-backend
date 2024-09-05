import { z } from 'zod';

// Product validation schema
const ReviewValidationSchema = z.object({
  body: z.object({
    ProductId:z.string(),
    review:z.string(),
    rating:z.number()
  }),
});


export const ReviewValidation = { ReviewValidationSchema };
