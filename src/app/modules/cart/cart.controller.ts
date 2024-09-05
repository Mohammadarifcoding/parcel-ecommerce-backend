import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartService } from './cart.service';

const AddedProduct: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id: id } = req.user;
  const result = await CartService.AddProductToCartIntoDb(req.body, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added Product to Cart',
    data: result,
  });
});

const GetCartProduct: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id: id } = req.user;
  const result = await CartService.GetAllProductFromCart(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all the product from Cart',
    data: result,
  });
});

const AddQuantity: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id: id } = req.user;
  const { id: productId } = req.params;
  const result = await CartService.UpdateAddQuantity(productId, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated the quantity',
    data: result,
  });
});

const ReduceQuantity: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id: id } = req.user;
  const { id: productId } = req.params;

  const result = await CartService.UpdateReduceQuantity(productId, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reduce the quantity',
    data: result,
  });
});

// const GetCartProduct: RequestHandler = catchAsync(async (req, res) => {
//     // @ts-ignore
//     const {_id:id } = req.user
//   const result = await CartService.GetAllProductFromCart(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Fetched all the product from Cart',
//     data: result,
//   });
// });

export const CartController = {
  AddedProduct,
  GetCartProduct,
  AddQuantity,
  ReduceQuantity,
};
