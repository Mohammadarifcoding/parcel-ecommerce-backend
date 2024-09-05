import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { CartModel } from '../cart/cart.model';
import { ProductModel } from '../product/product.model';
import { TCheckout, TStatusCheckout } from './checkout.interface';
import { CheckoutModel } from './checkout.model';

const createOrderInToDb = async (payload: TCheckout, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the items in the cart
    const cartItems = await CartModel.find({ _id: { $in: payload.products } })
      .populate('product')
      .session(session);

    // Check if the number of found items matches the number of requested products
    if (cartItems.length !== payload.products.length) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Some products might not be available',
      );
    }

    // Extract the quantities and products
    const quantities = cartItems.map((item) => item.quantity);
    const products = cartItems.map((item) => item.product);

    // Update the quantities for each product

    const updatePromises = products.map((product, idx) => {
      return ProductModel.findByIdAndUpdate(product, {
        $inc: { stock: -quantities[idx] },
      }).session(session);
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    // Create the order
    const order = await CheckoutModel.create(
      [{ ...payload, products: cartItems, user: userId }],
      { session },
    );

    // Mark the cart items as sold
    await CartModel.updateMany(
      { _id: { $in: payload.products } },
      { isSell: true },
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Populate and return the created order
    const populatedOrder = await CheckoutModel.findById(order[0]._id)
      .populate('products')
      .populate({
        path: 'products.product', // path to the field that needs to be populated
      })
      .lean();

    return populatedOrder;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getMyOrderFromDb = async (id: string) => {
  const Order = await CheckoutModel.find({ user: id })
    .populate('products')
    .populate({
      path: 'products.product', // path to the field that needs to be populated
    })
    .lean();
  return Order;
};

const getAllOrderFromDb = async () => {
  const Order = await CheckoutModel.find()
    .populate('products')
    .populate({
      path: 'products.product', // path to the field that needs to be populated
    })
    .lean();
  return Order;
};
const UpdateStatusToDb = async (id: string, payload: TStatusCheckout) => {
  const result = await CheckoutModel.findOneAndUpdate({ _id: id }, payload);
  return result;
};

const CancelOrderFromDb = async (id: string) => {
  const result = await CheckoutModel.deleteOne({ _id: id });
  return result;
};

const GetOrderDetailsFromDb = async (id: string) => {
  const result = await CheckoutModel.findById(id)
    .populate('products')
    .populate({
      path: 'products.product', // path to the field that needs to be populated
    })
    .lean();
  return result;
};

export const CheckoutService = {
  createOrderInToDb,
  getMyOrderFromDb,
  getAllOrderFromDb,
  UpdateStatusToDb,
  CancelOrderFromDb,
  GetOrderDetailsFromDb,
};
