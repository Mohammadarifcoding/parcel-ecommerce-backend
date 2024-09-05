import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { WishlistService } from './wishlist.service';

const AddedProduct: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id: userId } = req.user;
  const { id: productId } = req.params;
  const result = await WishlistService.AddProductToWishlistIntoDb(
    productId,
    userId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added Product to Wishlist',
    data: result,
  });
});

const GetMyWishlist: RequestHandler = catchAsync(async (req, res) => {
    // @ts-ignore
    const { _id: userId } = req.user;
    const result = await WishlistService.GetMyWishlistFromDb(
      userId,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetched All the wishlist product',
      data: result,
    });
  });

export const WishlistController = {
  AddedProduct,GetMyWishlist
};
