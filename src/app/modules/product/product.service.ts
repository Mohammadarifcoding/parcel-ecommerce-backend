import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ProductModel } from '../product/product.model';
import { ReviewModel } from '../review/review.model';
import { TProduct } from './product.interface';
import { generateSlug } from './product.utils';

const createProductIntoDB = async (payload: TProduct) => {
  const find = await ProductModel.findOne({
    slug_id: generateSlug(payload.title),
  });
  if (find) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Try a different name for this product',
    );
  }
  const result = await ProductModel.create({
    ...payload,
    slug_id: generateSlug(payload.title),
  });
  return result;
};

const updateProductIntoDb = async (id: string, payload: Partial<TProduct>) => {
  const check = await ProductModel.findOne({ slug_id: id });
  if (!check) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the product");
  }
  const update = await ProductModel.findOneAndUpdate({ slug_id: id }, payload);
  const result = await ProductModel.findOne({ slug_id: id });
  return result;
};

const getSingleProductFromDb = async (id: string) => {
  const product = await ProductModel.findOne({ slug_id: id });
  if (!product || !product.visibility || new Date(product.date) > new Date()) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't find the product");
  }
  const review = await ReviewModel.find({ ProductId: product._id });
  const data = { result: product, review: review };
  return data;
};

const DeleteProductFromDb = async (id: string) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the product");
  }
  const result = await ProductModel.findOneAndDelete({ _id: id });
  return result;
};
const getAllProductFromDb = async (query: Partial<TProduct>) => {
  const result = new QueryBuilder(
    ProductModel.find({
      visibility: true,
      date: { $lt: new Date().toISOString() }, // Ensure the date is in the past
    }).populate('reviews'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const student = await result.modelQuery;
  return student;
};

export const ProductService = {
  createProductIntoDB,
  updateProductIntoDb,
  getSingleProductFromDb,
  DeleteProductFromDb,
  getAllProductFromDb,
};
