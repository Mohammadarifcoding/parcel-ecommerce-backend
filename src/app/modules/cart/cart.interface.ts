import { Types } from 'mongoose';

export interface TCart {
  product: Types.ObjectId;  // Reference to the Product model
  user: Types.ObjectId;     // Reference to the User model
  quantity: number;
  isDeleted: boolean;
  isSell:boolean
}
