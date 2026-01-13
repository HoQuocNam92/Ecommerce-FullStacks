import * as WishlistService from './wishlist.services.js';
import { success } from '../../shared/utils/response.js';
export const getWishlistByUser = async (req, res, next) => {
    try {

        const wishlist = await WishlistService.getWishlistByUser(req.user.id);
        return success(res, wishlist, "Lấy danh sách yêu thích thành công");
    } catch (error) {
        console.log("check error", error)
        next(error);
    }
};

export const addToWishlist = async (req, res, next) => {
    try {


        const item = await WishlistService.addToWishlist({ product_id: req.body.product_id, user_id: req.user.id });

        return success(res, item, 'Thêm sản phẩm vào danh sách yêu thích thành công');
    } catch (error) {
        next(error);
    }
};

export const removeFromWishlist = async (req, res, next) => {
    try {

        await WishlistService.removeWishlist({ user_id: req.user.id, product_id: req.params.product_id });
        return success(res, 200, 'Xóa sản phẩm vào danh sách yêu thích thành công');
    } catch (error) {
        next(error);
    }
};
