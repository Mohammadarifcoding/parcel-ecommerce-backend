import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('user','admin'),
  validateRequest(ReviewValidation.ReviewValidationSchema),
  ReviewController.CreateReview,
);

export const ReviewRoutes = router;
