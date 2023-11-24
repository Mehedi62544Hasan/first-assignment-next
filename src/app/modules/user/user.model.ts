import { Schema, model } from 'mongoose';
import { Order, User, UserAddress, UserName } from './user.interface';

const useNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name require'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name require'],
  },
});

const useAddressSchema = new Schema<UserAddress>({
  street: {
    type: String,
    trim: true,
    required: [true, 'street require'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'city name require'],
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'country name require'],
  },
});

const OrderSchema = new Schema<Order>({
  product: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
});

const useUserSchema = new Schema<User>({
  userId: {
    type: Number,
    trim: true,
    required: [true, 'UserId name require'],
    unique: true,
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'username require'],
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password require'],
  },
  fullName: useNameSchema,
  age: {
    type: Number,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  isActive: {
    type: Boolean,
    trim: true,
    default: true,
  },
  hobbies: {
    type: [String],
    trim: true,
  },
  address: useAddressSchema,
  orders: [OrderSchema],
});

export const UserModel = model<User>('User', useUserSchema);
