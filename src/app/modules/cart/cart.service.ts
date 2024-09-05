import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ProductModel } from '../product/product.model';
import { TCart } from './cart.interface';
import { CartModel } from './cart.model';

const AddProductToCartIntoDb = async (payload: TCart, id: string) => {

  const ProductData = await ProductModel.findById(payload.product);
  if (!ProductData) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't find the product");
  } 
  
  // else {
  //   const NewQuantity = (ProductData.stock as number) - payload.quatity;
  //   if(ProductData.inStock && ProductData.stock > 0 && ProductData.stock <= payload.quatity){
  //       const result = await CartModel.create({ ...payload, user: id });
  //       const UpdateData = await ProductModel.updateOne({_id: payload.product},{
  //           stock : NewQuantity,
  //           inStock: NewQuantity > 0
  //       })
  //       return result
  //   }
  //   else{
  //       throw new AppError(httpStatus.NOT_FOUND,"Insufficient quantity available in inventory")
  //   }
  // }
  // console.log({ ...payload, user: id })
  const result = await CartModel.create({ ...payload, user: id })
  return result
  
};

const GetAllProductFromCart = async (id: string) => {
  const result = await CartModel.find({ user: id }).populate('product');
  return result;
};

const UpdateAddQuantity = async (productId: string, userId: string) => {
  const find = await CartModel.findOne({product : productId , user:userId})
  if(!find){
    throw new AppError(httpStatus.NOT_FOUND,"Couldn't found the product")
  }
  // console.log(find?.quantity + 1)
  const NewQuantity = find?.quantity + 1
  const result = await CartModel.findOneAndUpdate({product : productId , user:userId},{
    quantity : NewQuantity
  }   ,{ new: true })
  return result
};
const UpdateReduceQuantity = async (productId: string, userId: string) => {
  const find = await CartModel.findOne({product : productId , user:userId})
  if(!find){
    throw new AppError(httpStatus.NOT_FOUND,"Couldn't found the product")
  }
  const NewQuantity = find?.quantity - 1
  if(NewQuantity == 0){
    const result = await CartModel.deleteOne({product : productId , user:userId})
    return result
  }
  const result = await CartModel.findOneAndUpdate({product : productId , user:userId},{
    quantity : NewQuantity
  })
  return result
};

export const CartService = {
  AddProductToCartIntoDb,
  GetAllProductFromCart,UpdateAddQuantity,UpdateReduceQuantity
};
