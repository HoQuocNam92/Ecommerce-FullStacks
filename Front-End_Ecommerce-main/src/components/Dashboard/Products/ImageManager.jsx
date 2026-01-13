import React, { useState, useCallback, useRef, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui';
import { Upload, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '@/utils/axiosInstance';
import { ProductContext } from '@/contexts/Product/ProductContext';

const ImageManager = ({
    currentImages = [],
    onImagesChange,
    productId,
    onImageDelete,
    onImageUpload,
    allowProductSelection = false,
}) => {
    const { products } = useContext(ProductContext);

    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedProductId, setSelectedProductId] = useState(productId || '');

    const onDrop = useCallback(async (acceptedFiles) => {
        if (!acceptedFiles.length) return;

        if (!selectedProductId) {
            toast.error('Vui lòng chọn sản phẩm trước khi upload ảnh');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            acceptedFiles.forEach(file => {
                formData.append('images', file);
            });
            formData.append('product_id', selectedProductId);

            // Gọi API upload ảnh
            const response = await axiosInstance.post('/product-images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = response.data;

            // Thêm ảnh mới vào danh sách
            const newImages = [...currentImages, ...result.images];
            onImagesChange(newImages);

            toast.success(`Đã upload ${acceptedFiles.length} ảnh thành công!`);
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Upload ảnh thất bại!');
        } finally {
            setUploading(false);
        }
    }, [currentImages, selectedProductId, onImagesChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        multiple: true,
        disabled: uploading
    });

    const handleDeleteImage = async (imageId, imageUrl) => {
        try {
            // Gọi API xóa ảnh
            await axiosInstance.delete(`/product-images/${imageId}`);

            // Xóa ảnh khỏi danh sách
            const updatedImages = currentImages.filter(img => img.id !== imageId);
            onImagesChange(updatedImages);

            toast.success('Đã xóa ảnh thành công!');
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Xóa ảnh thất bại!');
        }
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            onDrop(files);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Quản lý ảnh sản phẩm</h3>
                <div className="flex gap-2">
                    {allowProductSelection && (
                        <select
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={uploading}
                        >
                            <option value="">Chọn sản phẩm</option>
                            {products?.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name_product || product.name}
                                </option>
                            ))}
                        </select>
                    )}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={openFileDialog}
                        disabled={uploading || (allowProductSelection && !selectedProductId)}
                        className="flex items-center gap-2"
                    >
                        <Upload size={16} />
                        Chọn ảnh
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Drop Zone */}
            <div
                {...getRootProps()}
                className={`
                    border-2 border-dashed rounded-lg p-8 text-center transition-colors
                    ${isDragActive || dragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }
                    ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                    <ImageIcon size={48} className="text-gray-400" />
                    <div className="text-lg font-medium">
                        {isDragActive ? 'Thả ảnh vào đây' : 'Kéo thả ảnh vào đây'}
                    </div>
                    <div className="text-sm text-gray-500">
                        Hoặc click để chọn ảnh
                    </div>
                    <div className="text-xs text-gray-400">
                        Hỗ trợ: JPG, PNG, WEBP (tối đa 5MB mỗi ảnh)
                    </div>
                </div>
            </div>

            {/* Upload Progress */}
            {uploading && (
                <div className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    Đang upload ảnh...
                </div>
            )}

            {/* Current Images Grid */}
            {currentImages.length > 0 && (
                <div className="space-y-3">
                    <h4 className="font-medium">Ảnh hiện tại ({currentImages.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {currentImages.map((image, index) => (
                            <div key={image.id || index} className="relative group">
                                <div className="aspect-square rounded-lg overflow-hidden border bg-gray-100">
                                    <img
                                        src={image.url}
                                        alt={`Ảnh ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/placeholder-image.png';
                                        }}
                                    />
                                </div>

                                {/* Delete Button */}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteImage(image.id, image.url)}
                                    className="absolute top-1 right-1 bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    title="Xóa ảnh"
                                >
                                    <Trash2 size={14} />
                                </button>

                                {/* Image Info */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="truncate">{image.url.split('/').pop()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {currentImages.length === 0 && !uploading && (
                <div className="text-center py-8 text-gray-500">
                    <ImageIcon size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>Chưa có ảnh nào. Hãy upload ảnh đầu tiên!</p>
                </div>
            )}
        </div>
    );
};

export default ImageManager;
