// components/Cart/CartSkeleton.js
export default function CartSkeleton() {
  return (
    <div>
      <div className="animate-pulse space-y-4">
        <div className="grid grid-cols-5 py-4 border-b text-center">
          <div className="h-4 bg-gray-300 rounded col-span-5"></div>
        </div>

        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 py-4 border-b items-center text-center"
          >
            <div className="flex items-center gap-4 justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded mx-auto w-16"></div>
            <div className="flex justify-center items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="w-14 h-10 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded mx-auto w-16"></div>
            <div className="w-16 h-4 bg-gray-300 rounded mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
