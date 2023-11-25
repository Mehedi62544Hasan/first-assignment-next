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

const userNameSchema = new Schema<TUserName>({
  firstName: {type: String},
  lastName: {type: String},
});

const userAddressSchema = new Schema<TUserAddress>({
  street: {type: String},
  city: {type: String},
  country: {type: String},
});

const OrderSchema = new Schema<TOrder>({
  product: {type: String},
  price: {type: Number},
  quantity: {type: Number},
});

const userUserSchema = new Schema<TUser, UserModel>({
  userId: {type: Number, unique: true},
  username: {type: String, unique: true},
  password: {type: String},
  fullName: userNameSchema,
  age: {type: Number},
  email: {type: String},
  isActive: {type: Boolean, default: true},
  hobbies: {type: [String]},
  address: userAddressSchema,
  orders: [OrderSchema],
});

userUserSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

userUserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.password_salt),
  );
  // do stuff
  next();
});
userUserSchema.post('save', async function (doc, next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  doc.password = '';
  // do stuff
  next();
});

export const User = model<TUser, UserModel>('User', userUserSchema);
