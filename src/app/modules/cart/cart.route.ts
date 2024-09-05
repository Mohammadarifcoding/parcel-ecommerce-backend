import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { CartValidation } from './cart.validation';
import { CartController } from './cart.controller';

const router = express.Router();

router.post(
  '/',
  auth('user','admin'),
  validateRequest(CartValidation.CartValidationSchema),
  CartController.AddedProduct,
);
router.get('/', auth('user','admin'),CartController.GetCartProduct)

router.patch('/add/:id',auth('user','admin'),CartController.AddQuantity)
router.patch('/reduce/:id',auth('user','admin'),CartController.ReduceQuantity)

export const CartRoutes = router;
