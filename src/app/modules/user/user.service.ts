import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const geAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  geAllUserFromDB,
  getUserFromDB,
};
