/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import ProductBreadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ProductImageGallery from "@/components/Products/ProductImageGallery";
import ProductInfo from "@/components/Products/ProductInfo";
import useProductDetails from "@/hooks/useProductDetails";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import Related from "@/components/Related/Related";
import ProductDescription from "@/components/Products/ProductDescription";
import Spiner from "@/components/Spiner/Spiner";
import useFlyToCart from "@/hooks/useFlyToCart";
import FlyToCartAnimation from "@/components/FlyToCartAnimation/FlyToCartAnimation";
import { useAuthStore } from "@/store/useAuthStore";
import Feedback from "@/components/Feedback/Feedback";
import useWishList from "@/hooks/useWishList";
const ProductDetail = () => {
  const account = useAuthStore((state) => state.user);

  const { createWishList } = useWishList()
  const { getProductDetails, getProductRelated } =
    useProductDetails();
  const [quantity, setQuantity] = useState(1);
  const { flyItem, flyToCart } = useFlyToCart();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [idImg, setIdImg] = useState(null);
  const [selectedImage, setSelectedImage] = useState()
  const { handleAddCart } = useCart();
  const cartIconRef = useRef();
  const addCart = async () => {

    if (!account) {
      window.location.href = "/signin";
      return;
    }
    try {
      await handleAddCart({
        quantity,
        color: selectedColor,
        size: selectedSize,
        product_id: getProductDetails?.data?.id,

      });
      flyToCart(selectedImage, {
        x: idImg.x, y: idImg.y
      }, {
        x: cartIconRef.x, y: cartIconRef.y
      })

    } catch (error) {
      toast.error(error);

    }
  }
  const handleWishList = async (id) => {
    try {
      await createWishList(id)
      toast.success("Thêm sản phẩm vào danh sách yêu thích thành công")
    } catch (error) {

      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    if (getProductDetails?.data) {
      setSelectedImage(getProductDetails?.data?.gallery[0]?.url)
    }
  }, [getProductDetails?.data])

  useEffect(() => {

    let products = JSON.parse(localStorage.getItem('recently_viewed')) || [];
    products = products?.filter(x => x?.id !== getProductDetails?.data?.id)

    products.unshift(getProductDetails?.data);
    if (products.length > 10) products.pop();
    localStorage.setItem('recently_viewed', JSON.stringify(products))

  }, [getProductDetails?.data?.id])

  if (getProductRelated?.isLoading || getProductDetails?.isLoading) {
    return <Spiner />
  }
  return (
    <div ref={cartIconRef} className="container w-full   bx-8">
      <ProductBreadcrumb category_slug={getProductDetails?.data?.category_slug} category_id={getProductDetails?.data?.category_id} name_category={getProductDetails?.data?.name_category} name_product={getProductDetails?.data?.name_product} />
      <div>



      </div>
      <div className="flex  md:flex-row gap-3">
        <ProductImageGallery
          gallery={getProductDetails?.data?.gallery}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setIdImg={setIdImg}

        />



        <ProductInfo
          addCart={addCart}
          product={getProductDetails?.data}
          quantity={quantity}
          setQuantity={setQuantity}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          handleWishList={handleWishList}
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 mt-8">Thông tin sản phẩm</h3>
      <div className=" grid   gap-6">
        <div className="lg:col-span-2 rounded-2xl">
          <ProductDescription description={getProductDetails?.data?.description} specifications={getProductDetails?.data?.attributes} />
        </div>
      </div>
      <div className="mt-8">

        <Feedback productId={getProductDetails?.data?.id} />
      </div>
      <Related Product_related={getProductRelated?.data} />
      <FlyToCartAnimation flyItem={flyItem} />
    </div >
  );
};

export default ProductDetail;

