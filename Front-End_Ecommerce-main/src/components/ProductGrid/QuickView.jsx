import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { ToUnitMoney } from "@/utils/ToUnitMoney";
import ReactStars from "react-rating-stars-component";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const QuickView = ({ open, onOpenChange, product }) => {
    const { handleAddCart } = useCart();

    const addCart = async () => {
        try {
            await handleAddCart({
                quantity: 1,
                product_id: product?.id,

            });
            toast.success("Đã thêm vào giỏ hàng!");

        } catch (error) {
            toast.error(error);

        }
    };



    return (
        <Dialog open={open} onOpenChange={(val) => {
            if (!val && product) {
                try {
                    const key = 'recently_viewed';
                    const existing = JSON.parse(localStorage.getItem(key) || '[]');
                    const filtered = existing.filter((p) => p.id !== product.id);
                    const next = [{ id: product.id, name: product.name_product, price: product.price, thumbnail: product?.gallery?.[0]?.url, slug: product.slug }, ...filtered].slice(0, 12);
                    localStorage.setItem(key, JSON.stringify(next));
                } catch (_) { }
            }
            onOpenChange(val);
        }}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Quick View</DialogTitle>
                </DialogHeader>
                {product && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-md flex items-center justify-center p-4">
                            <img src={product?.gallery?.[0]?.url} alt={product.name_product} className="object-contain max-h-72" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                {product.name_product}
                                {Number(product?.rating) === 0 && (
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">Mới</span>
                                )}
                            </h3>
                            <div className="text-red-600 font-semibold text-xl">{ToUnitMoney(product.price)}</div>
                            <div>
                                <ReactStars count={5} value={product.rating || 0} edit={false} size={18} activeColor="#ffd700" />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Button className="bg-red-700 text-white" onClick={addCart}>Thêm vào giỏ</Button>
                                <Button variant="outline" >Yêu thích</Button>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default QuickView;


