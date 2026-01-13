

const ProductSizeSelector = ({ sizes = [], selectedSize, setSelectedSize }) => {
    if (!sizes.length) return null;

    return (
        <div className="mt-4">
            <label className="block text-gray-700 mb-2 font-medium">Chọn màu</label>
            <div className="flex flex-wrap gap-2">
                {sizes.map(c => (
                    <button
                        key={c.size_id}
                        type="button"
                        className={`px-3 py-1 rounded border transition-colors 
              ${selectedSize === c.size_name ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 border-gray-300'}
            `}
                        onClick={() => setSelectedSize(c.size_name)}
                    >
                        {c.size_name} ({c.quantity})
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductSizeSelector;
