import express from 'express';
import authentication from '#src/shared/middlewares/Auth/authentication.js';
import * as WishlistController from './wishlist.controllers.js';
const router = express.Router();

router.use(authentication)

router.get('/', WishlistController.getWishlistByUser);
router.post('/', WishlistController.addToWishlist);
router.delete('/:product_id', WishlistController.removeFromWishlist);

export default router;