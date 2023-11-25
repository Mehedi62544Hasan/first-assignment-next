import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const zodValidationData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodValidationData);

    res.status(200).json({
      success: true,
      message: 'User create successfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User create Unsuccessfully',
      error: err.message,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.geAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Get All Users successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User get successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'User get Unsuccessfully',
      error: err.message,
    });
  }
};

//User info update
const userInfoUpdate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await UserServices.userInfoUpdateInDb(userId, userData);

    res.status(200).json({
      success: true,
      message: 'User info update successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'User info update Unsuccessfully',
      error: err.message,
    });
  }
};
// User delete
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Delete user successfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: true,
      message: 'Delete user Unsuccessfully',
      error: {
        success: false,
        message: err.message,
        error: {
          code: 404,
          description: 'User not found!',
        },
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  userInfoUpdate,
};
