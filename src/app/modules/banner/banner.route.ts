import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { BannerValidation } from './banner.validation';
import { BannersController } from './banner.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(BannerValidation.BannerValidationSchema),
  BannersController.CreateBanner,
);      

router.delete('/:id', auth('admin'), BannersController.deleteBanner);
          
router.get('/', BannersController.GetAllBanner);

router.patch('/:id', auth('admin'), BannersController.SwitchActive);                         
router.patch(
  '/update/:id',       
  auth('admin'),
  validateRequest(BannerValidation.updteBannerValidationSchema),
  BannersController.UpdatedBanner,
);            

router.get('/all', auth('admin'), BannersController.getAllBannerForAdmin);
router.get('/:id', auth('admin'), BannersController.getSingleBanner);
export const BannerRoutes = router;
