import { Schema, model } from 'mongoose';
import { Order, User, UserAddress, UserName } from './user.interface';

const useNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name require'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name require'],
  },
});

const useAddressSchema = new Schema<UserAddress>({
  street: {
    type: String,
    required: [true, 'street require'],
  },
  city: {
    type: String,
    required: [true, 'city name require'],
  },
  country: {
    type: String,
    required: [true, 'country name require'],
  },
});

const OrderSchema = new Schema<Order>({
  product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const useUserSchema = new Schema<User>({
  userId: {
    type: Number,
    required: [true, 'UserId name require'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'username require'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password require'],
  },
  fullName: useNameSchema,
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
  },
  address: useAddressSchema,
  orders: [OrderSchema],
});

export const UserModel = model<User>('User', useUserSchema);
