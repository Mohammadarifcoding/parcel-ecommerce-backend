import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const router = express.Router();

router.post(
  '/',
  // auth('admin'),
  validateRequest(ProductValidation.ProductValidationSchema),
  ProductController.CreateProduct,
);

router.patch(
  '/:id',
  // auth('admin'),
  validateRequest(ProductValidation.ProductUpdateValidationSchema),
  ProductController.UpdateProduct,
);

router.get('/:id', ProductController.GetSingleProduct);
router.delete('/:id', ProductController.DeleteProduct);
router.get('/', ProductController.GetAllProduct);

export const ProductRoutes = router;
