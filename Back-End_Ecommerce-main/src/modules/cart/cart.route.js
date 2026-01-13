import express from 'express';
import * as CartItem from './cart.controllers.js';
import authentication from '../../shared/middlewares/Auth/authentication.js';

const router = express.Router();

router.use(authentication);

router.get('/', CartItem.getAllCartItems);
router.get('/summary', CartItem.getCartSummary);
router.get('/user/:user_id', CartItem.getCartItemById);
router.post('/', CartItem.createCartItem);
router.get('/checkout', CartItem.checkoutCart);
router.put('/', CartItem.updateCartItem);
router.delete('/clear', CartItem.clearCart);
router.delete('/:id', CartItem.deleteCartItem);

export default router;