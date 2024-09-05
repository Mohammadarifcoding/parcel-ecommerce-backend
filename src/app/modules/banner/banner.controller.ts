import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BannerService } from './banner.service';

const CreateBanner: RequestHandler = catchAsync(async (req, res) => {
  const result = await BannerService.createBannerIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created the Banner',
    data: result,
  });
});

const deleteBanner: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BannerService.deleteBannerIntoDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted the banner',
    data: result,
  });
});
const GetAllBanner: RequestHandler = catchAsync(async (req, res) => {
  const result = await BannerService.getAllBannerFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all Banner',
    data: result,
  });
});
const SwitchActive: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BannerService.SwitchActiveFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Change the active value',
    data: result,
  });
});

const UpdatedBanner: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BannerService.updateBannerFromDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated the banner ',
    data: result,
  });
});
const getAllBannerForAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await BannerService.getAllBannerForAdminFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all banner for admin ',
    data: result,
  });
});
const getSingleBanner: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BannerService.getSingleBannerFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched single banner',
    data: result,
  });
});
export const BannersController = {
  CreateBanner,
  deleteBanner,
  GetAllBanner,
  SwitchActive,
  UpdatedBanner,
  getAllBannerForAdmin,
  getSingleBanner,
};
