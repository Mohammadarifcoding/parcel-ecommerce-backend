import { z } from 'zod';

// Define validation schema for TButton
const ButtonValidationSchema = z.object({
  text: z.string(),
  link: z.string(),
});

// Define validation schema for TBanner
const BannerValidationSchema = z.object({
  body: z.object({
    serial:z.number(),
    bannerName:z.string(),
    img: z.string(),
    isActive: z.boolean().default(true),
    direction: z.enum(['right', 'left']),
    title: z.string(),
    description: z.string(),
    button: z.array(ButtonValidationSchema),
  }),
});
const updteBannerValidationSchema = z.object({
  body: z.object({
    serial:z.number(),
    bannerName:z.string().optional(),
    img: z.string().optional(),
    isActive: z.boolean().default(true).optional(),
    direction: z.enum(['right', 'left']).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    button: z.array(ButtonValidationSchema).optional(),
  }),
});
// Export the validation schemas
export const BannerValidation = {
  BannerValidationSchema,
  updteBannerValidationSchema,
};
