import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAuth, TChangePassword, TUser } from './user.interface';
import { UserModel } from './user.model';

import bcrypt, { hash } from 'bcrypt';
import config from '../../config';
import { createToken } from './user.utils';
import { WishlistModel } from '../wishlist/wishlist.model';
import { CartModel } from '../cart/cart.model';
import { CheckoutModel } from '../checkout/checkout.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  const savedUser = await UserModel.findById(result._id, '-isDeleted')
    .select('-password')
    .exec();
  return savedUser;
};

const DoingSigninIntoDb = async (payload: TAuth) => {
  // const {email} = payload
  const findUser = await UserModel.findOne(
    { email: payload.email },
    '-isDeleted',
  );
  // console.log(findUser)
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the account");
  }
  //  checking if the user already deleted

  const isDeleted = findUser.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This account is already deleted');
  }
  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    findUser.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Password doesn't matched");
  }
  const { password, ...userWithoutEmail } = findUser.toObject();
  const jwtPayload = userWithoutEmail;

  const accessToken = createToken(
    jwtPayload,
    config.secret_access_token as string,
    '10000hr',
  );

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.secret_access_token as string,
  //   "1hr"
  // );
  return { data: {...userWithoutEmail, token: accessToken}  };
};

const changePasswordIntoDb = async (payload: TChangePassword, user: TUser) => {
  const { email } = user;
  //   Matching old password and also the password on the database
  const findData = await UserModel.findOne({ email });
  // @ts-ignore
  const { password: encryptedPassword } = findData;
  console.log(encryptedPassword, payload.oldPassword);
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    encryptedPassword,
  );
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Password doesn't matched");
  }

  //  Converting new password into encrypted password
  let salt = await bcrypt.genSaltSync(Number(config.bcrypt_salt_rounds));
  let newEncryptedPassword = await bcrypt.hash(payload.newPassword, salt);
  // Updating password
  const UpdatePassword = await UserModel.findOneAndUpdate(
    { email: user.email },
    { password: newEncryptedPassword },
  );
  return UpdatePassword;
};

const UpdateUserDataIntoDb = async (payload: Partial<TUser>,id:string) => {

  const UpdateUser = await UserModel.findByIdAndUpdate(
    id,
    payload,
  );
  const findUser = await UserModel.findOne({email:UpdateUser?.email})
  return findUser;
};


const GetUserProfileFromDb = async(userId:string)=>{
  const userData = await UserModel.findById(userId)
  const wishlist = await WishlistModel.find({user : userId})
  const cart = await CartModel.find({user:userId})
  const order = await CheckoutModel.find({user:userId})
  const result = {user:userData,wishlist:wishlist,cart:cart}

  return result
}

export const UserServices = {
  createUserIntoDB,
  DoingSigninIntoDb,
  changePasswordIntoDb,
  UpdateUserDataIntoDb, GetUserProfileFromDb
};
