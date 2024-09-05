import { model, Schema } from 'mongoose';
import { TWishlist } from './wishlist.interface';


const WishlistSchema = new Schema<TWishlist>(
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const WishlistModel = model<TWishlist>('Wishlist', WishlistSchema);
