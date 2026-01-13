import express from 'express';
const router = express.Router();

import Cart from './cart/cart.route.js';
import SettingRoute from './setting/setting.route.js';
import SubscriberRoute from './subscriber/subscriber.route.js';
import OrderCouponRoute from './order/coupon/orderCoupon.route.js';
import CouponRoute from './dashboard/coupon/coupon.route.js';
import ProductAttributeRoute from './product/attribute/productAttribute.route.js';
import ProductImageRoute from './product/image/productImage.route.js';
import NotificationRoute from './notification/notification.route.js';
import PaymentRoute from './payment/payment.route.js';
import UserRoute from './user/user.route.js';
import ProductRoute from './product/product/product.route.js';
import CategoryRoute from './category/category.route.js';
import UploadRoute from './upload/cloudinary.route.js';
import OrderRoute from './order/order/order.route.js';
import WishlistRoute from './wishlist/wishlist.route.js';
import AuthRoute from './auth/auth.routes.js'
import SearchRoute from './search/search.route.js';
import LocationRoute from '../modules/location/location.route.js';
import AddressRoute from '../modules/address/address.routes.js';
import DashboardRoute from '../modules/dashboard/index.js';
import BannerRoute from '../modules/banner/banner.route.js';
import ReviewsRoute from '../modules/reviews/reviews.route.js';
import ShipperRoute from '../modules/shipper/shipper.routes.js';

router.use('/cart', Cart);
router.use('/settings', SettingRoute);
router.use('/subscribers', SubscriberRoute);
router.use('/order-coupons', OrderCouponRoute);
router.use('/coupons', CouponRoute);
router.use('/product-attributes', ProductAttributeRoute);
router.use('/product-images', ProductImageRoute);
router.use('/notifications', NotificationRoute);
router.use('/payments', PaymentRoute);
router.use('/users', UserRoute);
router.use('/products', ProductRoute);
router.use('/categories', CategoryRoute);
router.use('/orders', OrderRoute);
router.use('/upload', UploadRoute);
router.use('/wishlist', WishlistRoute);
router.use('/auth', AuthRoute);
router.use('/search', SearchRoute);
router.use('/locations', LocationRoute);
router.use('/address', AddressRoute)
router.use('/dashboard', DashboardRoute);
router.use('/banners', BannerRoute);
router.use('/reviews', ReviewsRoute);
router.use('/shipper', ShipperRoute);

export default router;
