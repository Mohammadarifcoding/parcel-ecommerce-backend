import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const ProductSchema = new Schema<TProduct>(
  {
    slug_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    img: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: [String],
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    date: {
      type: String,
      default: new Date().toISOString(),
    },
    discount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    color: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
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
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'ProductId',
});

// ProductSchema.pre('save', function (next) {
//   if (this.isModified('title') || !this.slug_id) {  // Ensure slug is generated if title is modified or slug_id is missing
//     this.slug_id = generateSlug(this.title);
//   }
//   next();
// });

export const ProductModel = model<TProduct>('Product', ProductSchema);
