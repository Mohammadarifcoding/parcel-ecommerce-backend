import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { WishlistValidation } from './wishilst.validation';
import { WishlistController } from './wishlist.controller';

const router = express.Router();

router.post(
  '/:id',
  auth('user','admin'),
  validateRequest(WishlistValidation.WishlistValidationSchema),
  WishlistController.AddedProduct,
);
router.get('/', auth('user','admin'),WishlistController.GetMyWishlist)



export const WishlistRoutes = router;
