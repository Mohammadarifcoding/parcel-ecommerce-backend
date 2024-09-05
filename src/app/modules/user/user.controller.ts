import httpStatus from 'http-status';

import { RequestHandler } from 'express';
import sendResponse, { sendResponseWithToken } from '../../utils/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const SignInUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.DoingSigninIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result.data,
  });
});
const ChangePassword: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const result = await UserServices.changePasswordIntoDb(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Changed password',
    data: result,
  });
});
const UpdateUser: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id } = req.user;
  const result = await UserServices.UpdateUserDataIntoDb(req.body, _id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Updated Password',
    data: result,
  });
});

const GetUserProfile: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id: id } = req.user;
  const result = await UserServices.GetUserProfileFromDb(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fetched User Profile data',
    data: result,
  });
});
export const UserControllers = {
  createUser,
  SignInUser,
  ChangePassword,
  UpdateUser,
  GetUserProfile,
};
