

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, Upload, X } from "lucide-react"

const FeedbackForm = ({ PostReview, isPending, open, setIsOpen, onOpenChange, product, orderId }) => {
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState("")
    const [images, setImages] = useState([])
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)

        setImages(prev => [...prev, ...files])
    }

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append("rating", rating)
        formData.append("content", content)
        formData.append("product_id", product.product_id)
        formData.append("orderId", orderId)
        images.forEach(img => formData.append("images", img))

        await PostReview.mutateAsync(formData)
        onOpenChange(false)
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-3">
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-14 h-14 rounded-md object-cover"
                    />
                    <p className="font-medium">{product.name}</p>
                </div>

                {/* Rating */}
                <div>
                    <p className="text-sm mb-2">Chất lượng sản phẩm</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star
                                key={star}
                                className={`w-6 h-6 cursor-pointer ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div>
                    <Textarea
                        placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                    />
                </div>

                {/* Upload image */}
                <div>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                        <Upload className="w-4 h-4" />
                        Thêm hình ảnh
                        <input
                            type="file"
                            multiple
                            hidden
                            accept="image/*"
                            onChange={handleImageUpload}
                        />

                    </label>

                    {images.length > 0 && (
                        <div className="flex gap-2 mt-3 flex-wrap">
                            {images.map((img, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        className="w-16 h-16 object-cover rounded-md border"
                                    />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                                    >
                                        <X className="w-3 h-3 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!rating || !content}
                    >
                        {isPending ? "Đang nhận xét..." : "Nhận xét"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default FeedbackForm

