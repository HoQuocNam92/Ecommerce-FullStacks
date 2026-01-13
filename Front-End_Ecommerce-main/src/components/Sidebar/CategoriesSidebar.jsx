import React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Package,
  Grid3X3,
  List,
  Filter,
  X
} from 'lucide-react';
import useProduct from '@/hooks/useProduct';
const CategoriesSidebar = ({ categories, setCategoryId }) => {
  const navigate = useNavigate();


  const { setSortBy, sortBy } = useProduct();
  const handleCategoryClick = (data) => {
    navigate(`/products/${data.slug}/${data.id}}`);
    setCategoryId(data.id);
  };






  return (
    <div className="w-full space-y-6  ">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Danh mục</h3>
        </div>

        <div className="">
          <div className="space-y-2">


            {categories?.map((category) => (
              <div key={category.id} className="space-y-1  ">
                <Button onClick={() => handleCategoryClick(category)} className={`bg-white text-black flex justify-between w-full ps-3 pe-0 pt-0 pb-0 }`}>
                  <div className="flex items-center space-x-2 rounded-lg">
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">

                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Button>
              </div>

            ))}
          </div>
        </div>
      </div>



      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Sắp xếp</h3>
        </div>

        <div className="p-4 space-y-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="price_asc">Giá thấp đến cao</option>
            <option value="price_desc">Giá cao đến thấp</option>
            <option value="name_asc">Tên A-Z</option>
            <option value="name_desc">Tên Z-A</option>
          </select>


        </div>
      </div>


    </div >
  );
};

export default CategoriesSidebar;

