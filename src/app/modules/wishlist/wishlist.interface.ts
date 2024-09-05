import { Types } from 'mongoose';

export interface TWishlist {
  product: Types.ObjectId;  // Reference to the Product model
  user: Types.ObjectId;     // Reference to the User model
  isDeleted: boolean;
}
