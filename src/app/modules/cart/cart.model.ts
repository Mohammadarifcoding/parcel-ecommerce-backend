import { model, Schema } from 'mongoose';
import { TCart } from './cart.interface';

const CartSchema = new Schema<TCart>(
  {
    product: {
      type: Schema.Types.ObjectId,  // Assuming product is a reference to a Product model
      ref: 'Product',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,  // Assuming user is a reference to a User model
      ref: 'User',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isSell:{
      type:Boolean,
      default : false,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const CartModel = model<TCart>('Cart', CartSchema);
