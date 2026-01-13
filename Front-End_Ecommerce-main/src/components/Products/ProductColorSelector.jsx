

const ProductColorSelector = ({ colors = [], selectedColor, setSelectedColor }) => {
  if (!colors.length) return null;

  return (
    <div className="mt-4">
      <label className="block text-gray-700 mb-2 font-medium">Chọn màu</label>
      <div className="flex flex-wrap gap-2">
        {colors.map(c => (
          <button
            key={c.color_id}
            type="button"
            className={`px-3 py-1 rounded border transition-colors 
              ${selectedColor === c.color_name ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 border-gray-300'}
            `}
            onClick={() => setSelectedColor(c.color_name)}
          >
            {c.color_name} ({c.quantity})
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductColorSelector;
