import { model, Schema } from 'mongoose';
import { TReview } from './review.interface';


const ReviewSchema = new Schema<TReview>(
  {
    ProductId: {
      type: String,
      required: true,
      ref: 'Product',
    },
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    review:{
        type:String,
        required:true
    },
    rating:{
      type:Number,
      required:true
    }
  },
  {
    timestamps: true,
  },
);

export const ReviewModel = model<TReview>('Review', ReviewSchema);
