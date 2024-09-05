import { Router } from 'express';
import { CartRoutes } from '../modules/cart/cart.route';
import { CheckoutRoutes } from '../modules/checkout/checkout.route';

import { AuthRoutes, UserRoutes } from '../modules/user/user.route';
// import { ReviewRoutes } from './../modules/review/review.route';
import { BannerRoutes } from '../modules/banner/banner.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { WishlistRoutes } from './../modules/wishlist/wishlist.route';
import { ProductRoutes } from '../modules/product/product.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/checkout',
    route: CheckoutRoutes,
  },
  {
     path:'/banner',
     route:BannerRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
