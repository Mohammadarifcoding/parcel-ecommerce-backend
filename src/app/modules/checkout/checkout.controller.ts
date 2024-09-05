import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CheckoutService } from './checkout.service';

const CreateOrder: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id } = req.user;
  const result = await CheckoutService.createOrderInToDb(req.body, _id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Order',
    data: result,
  });
});

const GetMyOrder: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id } = req.user;
  const result = await CheckoutService.getMyOrderFromDb(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all my order',
    data: result,
  });
});
const GetAllOrder: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const result = await CheckoutService.getAllOrderFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched All Order',
    data: result,
  });
});
const UpdateStatus: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CheckoutService.UpdateStatusToDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated Status',
    data: result,
  });
});

const CancelOrder: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CheckoutService.CancelOrderFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Order',
    data: result,
  });
});

const GetOrderDetails: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CheckoutService.GetOrderDetailsFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched Order Details',
    data: result,
  });
});

export const CheckoutController = {
  CreateOrder,
  GetMyOrder,
  GetAllOrder,
  UpdateStatus,
  CancelOrder,
  GetOrderDetails,
};
