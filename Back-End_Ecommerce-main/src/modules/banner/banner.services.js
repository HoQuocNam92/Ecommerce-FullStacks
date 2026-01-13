import cloudinary from '#src/shared/utils/cloudinary.js';
import * as bannerRepo from './banner.repositories.js'


export const createBanner = async (data) => await bannerRepo.createBanner(data);
export const getAllBanner = async (page) => {
    const pageSize = 20;
    const offset = (page - 1) * 20;
    const res = await bannerRepo.getAllBanner(offset, pageSize);
    const totalPage = Math.ceil(res[0].totalRecord / pageSize)
    return {
        res,
        totalPage
    }
}


export const updateBanner = async (data, img) => {
    if (!data) throw new Error("Không có data để cập nhật");
    if (img) {
        const image = data.image_url.split("/upload/")[1].split('/').slice(1).join('/').replace(/\.[^./]+$/, '')
        await cloudinary.uploader.destroy(image)
        return await bannerRepo.updateBanner(data, img)
    }
    return await bannerRepo.updateBanner(data, null)

}

export const deleteBanner = async (id) => {

    if (!id) throw new Error("Không có id để xóa");
    try {
        const img = await bannerRepo.getImage(id);

        const publicId = img?.image_url.split('/upload/')[1].split('/').slice(1).join('/').replace(/\.[^/.]+$/, '')
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        throw new Error("Error_delete_image")
    }
    return await bannerRepo.deleteBanner(id)
}