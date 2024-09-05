import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email('Invalid email address'),
    role: z.enum(['user', 'admin']).default('user'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phone: z.string().optional(),
    address: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

const userUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    role: z.enum(['user', 'admin']).default('user').optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const ChangePasswordValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
});
const AuthValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
export const UserValidation = {
  userUpdateValidationSchema,
  userValidationSchema,
  AuthValidationSchema,
  ChangePasswordValidationSchema,
};
