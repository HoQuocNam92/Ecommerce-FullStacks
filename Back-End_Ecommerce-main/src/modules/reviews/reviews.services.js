import * as ReviewsRepo from './reviews.repositories.js';

export const getReviewsByProduct = async (ProductId) => {
    const res = await ReviewsRepo.getReviewsByProduct(ProductId);

    let data = res.map((item) => ({ ...item, gallery: JSON.parse(item.gallery) }))
    return data;

}
export const createReviewByProduct = async (data, imagesFile) => {
    const review_id = await ReviewsRepo.createReviewsByProduct(data);

    if (!imagesFile.length) return review_id;
    const images = imagesFile.map((item) => ({ review_id, url: item.path }))

    await Promise.all(images.map(item => ReviewsRepo.createReviewImage(item)))
    return review_id;
}
