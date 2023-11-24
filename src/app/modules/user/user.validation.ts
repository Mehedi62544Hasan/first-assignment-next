import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().trim().max(12),
  lastName: z.string().trim().max(12),
});

const userAddressValidationSchema = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});

const ordersValidationSchema = z.object({
  product: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z.string().trim(),
  fullName: userNameValidationSchema,
  age: z.number(),
  email: z.string().trim().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().trim()),
  address: userAddressValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
});

export default userValidationSchema;
