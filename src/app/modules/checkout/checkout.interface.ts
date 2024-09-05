import { Types } from 'mongoose';

export interface TCheckout {
  products: Types.ObjectId[]; // Array of ObjectIds referencing the Product model
  user: Types.ObjectId; // ObjectId referencing the User model
  OrderPhone: string;
  townOrCity: string;
  shippingAddress: string;
  isPaid: boolean;
  status:
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'out-for-delivery'
    | 'delivered'
    | 'cancelled'
    | 'refunded'
    | 'failed'
    | 'on-hold'
    | 'awaiting-payment'
    | 'partially-shipped'
    | 'returned'
    | 'completed'
    | 'awaiting-fulfillment'
    | 'awaiting-pickup';
  price: number;
  isPlaced: boolean;
  isDeleted: boolean;
}

export interface TStatusCheckout {
  status:
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'out-for-delivery'
    | 'delivered'
    | 'cancelled'
    | 'refunded'
    | 'failed'
    | 'on-hold'
    | 'awaiting-payment'
    | 'partially-shipped'
    | 'returned'
    | 'completed'
    | 'awaiting-fulfillment'
    | 'awaiting-pickup';
}
