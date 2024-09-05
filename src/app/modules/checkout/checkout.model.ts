import { model, Schema } from 'mongoose';
import { TCheckout } from './checkout.interface';

// Define the schema for the products within the checkout
const CheckoutSchema = new Schema<TCheckout>(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Cart', // Reference to the Cart model
        required: true,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    OrderPhone: {
      type: String,
      required: true,
    },
    townOrCity: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String, // Changed to String
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'processing',
        'shipped',
        'out-for-delivery',
        'delivered',
        'cancelled',
        'refunded',
        'failed',
        'on-hold',
        'awaiting-payment',
        'partially-shipped',
        'returned',
        'completed',
        'awaiting-fulfillment',
        'awaiting-pickup',
      ],
      default: 'pending',
    },
    price: {
      type: Number,
      required: true,
    },
    isPlaced: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Export the model
export const CheckoutModel = model<TCheckout>('Checkout', CheckoutSchema);
