import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ProductModel } from '../product/product.model';
import { WishlistModel } from './wishlist.model';

const AddProductToWishlistIntoDb = async (
  productId: string,
  userId: string,
) => {
  const ProductData = await ProductModel.findById(productId);
  if (!ProductData) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't find the product");
  }
  const FindExisting = await WishlistModel.findOne({
    user: userId,
    product: productId,
  });
  if (FindExisting) {
    throw new AppError(httpStatus.FOUND, 'This product is already wishlisted');
  }
  const result = await WishlistModel.create({
    user: userId,
    product: productId,
  });
  return result;
};

const GetMyWishlistFromDb = async (
    userId: string,
  ) => {
    const result = await WishlistModel.find({user:userId}).populate('product')
    return result;
  };

export const WishlistService = {
  AddProductToWishlistIntoDb,GetMyWishlistFromDb
};
