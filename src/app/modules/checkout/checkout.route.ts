import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CheckoutController } from './checkout.controller';
import { CheckoutValidation } from './checkout.validation';

const router = express.Router();

router.post(
  '/',
  auth('user', 'admin'),
  validateRequest(CheckoutValidation.CheckoutValidationSchema),
  CheckoutController.CreateOrder,
);

router.get(
  '/',
  auth('user', 'admin'),
  // validateRequest(CheckoutValidation.CheckoutValidationSchema),
  CheckoutController.GetMyOrder,
);

router.get(
  '/all',
  auth('admin'),
  // validateRequest(CheckoutValidation.CheckoutValidationSchema),
  CheckoutController.GetAllOrder,
);
router.patch(
  '/status/:id',
  auth('admin'),
  // validateRequest(CheckoutValidation.CheckoutValidationSchema),
  validateRequest(CheckoutValidation.StatusUpdateCheckoutValidaiton),
  CheckoutController.UpdateStatus,
);

router.delete('/cancel/:id', CheckoutController.CancelOrder);

router.get('/:id', CheckoutController.GetOrderDetails);

export const CheckoutRoutes = router;
