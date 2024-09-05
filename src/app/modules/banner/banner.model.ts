import { model, Schema, Document } from 'mongoose';
import { TBanner, TButton } from './banner.interface';

// Define the TButton schema
const ButtonSchema = new Schema<TButton>({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// Define the TBanner schema
const BannerSchema = new Schema<TBanner>(
  {
    serial:{
      type:Number,
      required:true
    },
    bannerName:{
     type:String,
     required:true
    },
    img: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      enum: ['right', 'left'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    button: {
      type: [ButtonSchema], // Use ButtonSchema for the button field
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Create the Mongoose model for TBanner
export const BannerModel = model<TBanner>('Banner', BannerSchema);
