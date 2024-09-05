import { z } from 'zod';

// Validation schema for creating a checkout
const CheckoutValidationSchema = z.object({
  body: z.object({
    products: z.array(z.string()), // Array of product IDs
    // user: z.string(), // User ID must be a string
    OrderPhone: z.string(), // Order phone must be a string
    townOrCity: z.string(), // Town or city must be a string
    shippingAddress: z.string(), // Shipping address must be a string
    isPaid: z.boolean().default(false), // isPaid defaults to false
    status: z
      .enum([
        'pending',
        'processing',
        'shipped',
        'out-for-delivery',
        'delivered',
        'cancelled',
        'refunded',
        'failed',
        'on-hold',
        'awaiting-payment',
        'partially-shipped',
        'returned',
        'completed',
        'awaiting-fulfillment',
        'awaiting-pickup',
      ])
      .default('pending'), // Status must be one of these values
    price: z.number(), // Price must be a number
    isPlaced: z.boolean().default(false),
    isDeleted: z.boolean().default(false), // isDeleted defaults to false
  }),
});

// Validation schema for updating a checkout
const CheckoutUpdateValidationSchema = z.object({
  body: z.object({
    products: z.array(z.string()).optional(), // Optional array of product IDs
    // user: z.string().optional(), // Optional user ID
    OrderPhone: z.string().optional(), // Optional order phone
    townOrCity: z.string().optional(), // Optional town or city
    shippingAddress: z.string().optional(), // Optional shipping address
    isPaid: z.boolean().optional(), // Optional isPaid
    status: z
      .enum([
        'pending',
        'processing',
        'shipped',
        'out-for-delivery',
        'delivered',
        'cancelled',
        'refunded',
        'failed',
        'on-hold',
        'awaiting-payment',
        'partially-shipped',
        'returned',
        'completed',
        'awaiting-fulfillment',
        'awaiting-pickup',
      ])
      .optional(), // Optional status with allowed values
    price: z.number().optional(), // Optional price
    isPlaced: z.boolean().default(false).optional(),
    isDeleted: z.boolean().default(false).optional(), // Optional isDeleted, defaults to false
  }),
});

const StatusUpdateCheckoutValidaiton = z.object({
  body: z.object({
    status: z.enum([
      'pending',
      'processing',
      'shipped',
      'out-for-delivery',
      'delivered',
      'cancelled',
      'refunded',
      'failed',
      'on-hold',
      'awaiting-payment',
      'partially-shipped',
      'returned',
      'completed',
      'awaiting-fulfillment',
      'awaiting-pickup',
    ]),
  }),
});

export const CheckoutValidation = {
  CheckoutValidationSchema,
  CheckoutUpdateValidationSchema,
  StatusUpdateCheckoutValidaiton,
};
