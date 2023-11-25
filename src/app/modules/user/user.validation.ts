import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'firstName is required',
    })
    .max(12),

  lastName: z
    .string({
      required_error: 'lastName is required',
    })
    .max(12),
});

const userAddressValidationSchema = z.object({
  street: z.string({
    required_error: 'street is required',
  }),

  city: z.string({
    required_error: 'city is required',
  }),

  country: z.string({
    required_error: 'country is required',
  }),
});

const ordersValidationSchema = z.object({
  product: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number({
    required_error: 'userId is required',
  }),

  username: z.string({
    required_error: 'username is required',
  }),

  password: z.string({
    required_error: 'password is required',
  }),

  fullName: userNameValidationSchema,
  age: z.number({
    required_error: 'age is required',
  }),

  email: z
    .string({
      required_error: 'email is required',
    })
    .email({ message: 'Invalid email address' }),

  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
});

export default userValidationSchema;
