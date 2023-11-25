import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  const result = await User.create(userData);
  return result;
};

const geAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const getUserFromDB = async (id: string) => {
  const userId = Number(id);
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId: userId });
    return result;
  }
  throw new Error('User not available');
};

//user delete function
const deleteUserFromDB = async (id: string) => {
  const userId = Number(id);
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId: userId });
    return result;
  }
  throw new Error('User not Found');
};

export const UserServices = {
  createUserIntoDB,
  geAllUserFromDB,
  getUserFromDB,
  deleteUserFromDB,
};
