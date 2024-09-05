import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import { TReview } from './review.interface';
import { ReviewModel } from './review.model';
import { ProductModel } from '../product/product.model';

const createReviewIntoDB = async (payload: TReview, id: string) => {
  const checkData = await ProductModel.findOne({ _id: payload.ProductId });
  if (!checkData) {
    throw new AppError(httpStatus.NOT_FOUND, "This product doesn't exits");
  }
  const result = await ReviewModel.create({ ...payload, userId: id });
  return result;
};

export const reviewService = {
  createReviewIntoDB,
};
