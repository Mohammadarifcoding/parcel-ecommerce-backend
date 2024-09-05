import express from 'express';
import { UserControllers } from './user.controller';

import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const Auth = express.Router();
const User = express.Router()
Auth.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);
Auth.post(
  '/signin',
  validateRequest(UserValidation.AuthValidationSchema),
  UserControllers.SignInUser,
);
Auth.patch('/changepassword',auth('admin','user') , validateRequest(UserValidation.ChangePasswordValidationSchema),UserControllers.ChangePassword)

User.patch('/',auth('admin','user'),validateRequest(UserValidation.userUpdateValidationSchema),UserControllers.UpdateUser)


User.get('/get-profile',auth('admin','user'),UserControllers.GetUserProfile)



export const UserRoutes = User
export const AuthRoutes = Auth;
