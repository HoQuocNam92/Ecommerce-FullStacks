import * as WishlistRepo from './wishlist.repositories.js';

export const getWishlistByUser = (id) => {
    if (!id) throw new Error('User ID is required');
    return WishlistRepo.getWishlistByUser(id);
};
export const addToWishlist = (data) => {
    if (!data.user_id || !data.product_id) throw new Error('User ID and Product ID are required');
    return WishlistRepo.addToWishlist(data);
};
export const removeWishlist = (data) => {
    if (!data.user_id || !data.product_id) throw new Error('User ID and Product ID are required');
    return WishlistRepo.removeFromWishlist(data);
};
