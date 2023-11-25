import { Schema, model } from 'mongoose';
import {
  TOrder,
  TUser,
  TUserAddress,
  UserModel,
  TUserName,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const useNameSchema = new Schema<TUserName>({
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

const useAddressSchema = new Schema<TUserAddress>({
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

const OrderSchema = new Schema<TOrder>({
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

const useUserSchema = new Schema<TUser, UserModel>({
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
  },
  email: {
    type: String,
    trim: true,
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

useUserSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

useUserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.password_salt),
  );
  // do stuff
  next();
});
useUserSchema.post('save', async function (doc, next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  doc.password = '';
  // do stuff
  next();
});

export const User = model<TUser, UserModel>('User', useUserSchema);
