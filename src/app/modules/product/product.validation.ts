import { z } from 'zod';

// Blog validation schema
const ProductValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    category: z.string(),
    img:z.array(z.string()),
    inStock: z.boolean().default(true),
    description: z.string(),
    details: z.array(z.string()),
    size: z.array(z.string()),
    price: z.number(),
    visibility: z.boolean().default(true),
    date: z.string().default(new Date().toISOString()),
    discount: z.number().default(0),
    tax: z.number().default(0),
    color: z.array(z.string()),
    stock: z.number(),
    isDeleted: z.boolean().default(false),
  }),
});

const ProductUpdateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    inStock: z.boolean().optional(),
    description: z.string().optional(),
    details: z.array(z.string()).optional(),
    size: z.array(z.string()).optional(),
    price: z.number().optional(),
    visibility: z.boolean().optional(),
    date: z.string().optional(),
    discount: z.number().optional(),
    tax: z.number().optional(),
    color: z.array(z.string()).optional(),
    stock: z.number().optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const ProductValidation = {
  ProductValidationSchema,
  ProductUpdateValidationSchema,
};
