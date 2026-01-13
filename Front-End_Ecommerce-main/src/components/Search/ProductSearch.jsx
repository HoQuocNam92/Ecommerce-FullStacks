import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, Clock, TrendingUp, Star } from 'lucide-react';
import useSearch from '@/hooks/useSearch';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../Error/ErrorFallback';
import { Button } from '../ui';
const SearchItem = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const { searchProduct, loading, error } = useSearch(searchTerm);
  useEffect(() => {
    setTrendingSearches([
      'iPhone 15', 'Laptop Gaming', 'Áo thun', 'Sách hay', 'Giày sneaker'
    ]);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (term = searchTerm) => {
    if (!term.trim()) return;

    navigate(`/products?search=${encodeURIComponent(term)}`);
    setIsOpen(false);


  };



  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTrendingClick = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };


  const clearSearch = () => {
    setSearchTerm('');
    // setSearchResults([]);
    inputRef.current?.focus();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="relative flex-1 max-w-2xl" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyPress={handleKeyPress}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>


      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[700px] overflow-y-auto">


          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-medium text-gray-700">Tìm kiếm phổ biến</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleTrendingClick(search)}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {searchProduct?.length > 0 && (
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Kết quả tìm kiếm</h4>
              <div className="space-y-2">
                {searchProduct?.map((product) => (
                  <Link to={`/product/${product.slug}`}
                    key={product.id}
                    onClick={() => {
                      setIsOpen(false);
                      setSearchTerm('')
                    }}
                    className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <img
                      src={product.url}
                      alt={product.name_products}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <h5 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product.name_products}
                      </h5>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-semibold text-red-700">
                          {formatPrice(product.price)}
                        </span>

                      </div>
                      <p className="text-xs text-gray-500">{product.name_category}</p>
                    </div>

                  </Link>
                ))}
              </div>
            </div>
          )}



          {loading && (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Đang tìm kiếm...</p>
            </div>
          )}
          {!loading && searchProduct.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">Không tìm thấy sản phẩm nào</p>
              <p className="text-xs text-gray-400 mt-1">Thử từ khóa khác</p>
            </div>
          )}
          {error && (
            <div className="p-4 text-center text-sm text-red-700">
              Có lỗi xảy ra khi tìm kiếm sản phẩm.
            </div>
          )}

          {searchTerm && (
            <div className="p-4 border-t border-gray-200">
              <Button
                onClick={() => handleSearch()}
                className={'w-full'}
              >
                Tìm kiếm "{searchTerm}"
              </Button>
            </div>
          )}
        </div>
      )
      }
    </div>
  );
};

export default function ProductSearch() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SearchItem />
    </ErrorBoundary>
  )
}


