import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBanner } from './banner.interface';
import { BannerModel } from './banner.model';

const createBannerIntoDB = async (payload: TBanner) => {
  const result = await BannerModel.create(payload);
  return result;
};

const deleteBannerIntoDb = async (id: string) => {
  const find = await BannerModel.findById(id);
  if (!find) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the banner");
  }
  const result = await BannerModel.deleteOne({ _id: id });
  return result;
};

const getAllBannerFromDb = async () => {
  const result = (await BannerModel.find({ isActive: true }).sort({ serial: 1 }));
  return result;
};
const SwitchActiveFromDb = async (id: string) => {
  const find = await BannerModel.findById(id);
  if (!find) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the banner");
  }
  const update = await BannerModel.findByIdAndUpdate(id, {
    isActive: !find.isActive,
  });
  return update;
};

const updateBannerFromDb = async (id: string, payload: Partial<TBanner>) => {
  const check = await BannerModel.findById(id);
  if (check) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the banner");
  }
  const result = await BannerModel.findByIdAndUpdate(id, payload);
  return result;
};

const getAllBannerForAdminFromDb = async () => {
  const result = await BannerModel.find();
  return result;
};

const getSingleBannerFromDb = async (id: string) => {
  const result = await BannerModel.findById(id);
  if (result) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the banner");
  }
  return result;
};
export const BannerService = {
  createBannerIntoDB,
  deleteBannerIntoDb,
  getAllBannerFromDb,
  SwitchActiveFromDb,
  getAllBannerForAdminFromDb,
  getSingleBannerFromDb,
  updateBannerFromDb,
};
