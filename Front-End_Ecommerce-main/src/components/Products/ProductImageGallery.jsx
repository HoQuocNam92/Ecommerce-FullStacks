import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ProductImageGallery = ({ setSelectedImage, selectedImage, gallery, setIdImg }) => {
  const showScroll = useMemo(() => (Array.isArray(gallery) ? gallery.length >= 5 : false), [gallery]);
  const [zoom, setZoom] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = document.getElementById("product-image")
    if (id) setIdImg(id.getBoundingClientRect())
  }, [])
  return (
    <div className="flex flex-col gap-1 justify-between rounded-2xl bg-white">
      <div className="w-[400px]   p-2 max-h-[432px]   flex justify-center items-center   rounded-md overflow-hidden">
        <div>
          <img
            id="product-image"
            src={selectedImage}
            alt="Selected"
            className={`object-contain w-[368px]  h-[368px]   transition-transform ${zoom ? 'scale-110' : 'scale-100'}`}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      <div className={`flex  max-w-[400px]  rounded-2xl   bg-white  ${showScroll ? "overflow-x-auto px-2" : "overflow-hidden"}`}  >
        {Array.isArray(gallery) && gallery.length > 0 && (
          gallery.map((item, idx) => (
            <div key={idx} className="w-[54px] flex-shrink-0 p-1   flex justify-center items-center rounded-md">
              <img
                src={item.url}
                alt="thumb"
                className={`w-[42px] h-[42px] object-contain border cursor-pointer rounded ${selectedImage === item.url
                  ? "border-red-500 border-4"
                  : "border-gray-300"
                  }`}
                onClick={() => setSelectedImage(item.url)}
              />

            </div>
          ))
        )}
      </div>


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <img src={selectedImage} alt="Lightbox" className="w-full h-auto object-contain" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductImageGallery;
