import * as ProductAttributeService from '../attribute/productAttribute.services.js';
import { success } from '../../../shared/utils/response.js';
export const getAllAttributesByProduct = async (req, res, next) => {
    try {
        const attrs = await ProductAttributeService.getProductAttributes();
        return success(res, attrs);
        // res.json(attrs);
    } catch (error) {
        next(error);
    }
};

export const getAttributesByProduct = async (req, res, next) => {
    try {
        const attrs = await ProductAttributeService.getProductAttribute(req.params.product_id);
        return success(res, attrs);
    } catch (error) {
        next(error);

    }
};

export const addAttribute = async (req, res, next) => {
    try {
        const attr = await ProductAttributeService.createProductAttribute(req.body);
        return success(res, attr, 'Attribute created successfully');
    } catch (error) {
        next(error);

    }
};

export const deleteAttribute = async (req, res, next) => {
    try {
        await ProductAttributeService.deleteProductAttribute(req.params.id);
        return success(res, 200, 'Attribute deleted successfully');
    } catch (error) {
        next(error);

    }
};
