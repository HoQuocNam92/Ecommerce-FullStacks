// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Grid3X3,
//   List,
//   Search,
//   Filter,
//   ChevronRight,
//   Package,
//   TrendingUp,
//   Star
// } from 'lucide-react';

// const Categories = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('name');

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       // Mock data - replace with real API call
//       const mockCategories = [
//         {
//           id: 1,
//           name: 'Điện thoại & Phụ kiện',
//           description: 'Điện thoại thông minh, tai nghe, sạc dự phòng và các phụ kiện khác',
//           image: 'https://via.placeholder.com/300x200',
//           product_count: 1250,
//           child_count: 8,
//           is_active: true
//         },
//         {
//           id: 2,
//           name: 'Laptop & Máy tính',
//           description: 'Laptop, PC, máy tính bảng và các thiết bị công nghệ',
//           image: 'https://via.placeholder.com/300x200',
//           product_count: 890,
//           child_count: 5,
//           is_active: true
//         },
//         {
//           id: 3,
//           name: 'Thời trang',
//           description: 'Quần áo, giày dép, túi xách và phụ kiện thời trang',
//           image: 'https://via.placeholder.com/300x200',
//           product_count: 2100,
//           child_count: 12,
//           is_active: true
//         },
//         {
//           id: 4,
//           name: 'Sách & Văn phòng phẩm',
//           description: 'Sách, tạp chí, dụng cụ học tập và văn phòng phẩm',
//           image: 'https://via.placeholder.com/300x200',
//           product_count: 750,
//           child_count: 6,
//           is_active: true
//         },
//         {
//           id: 5,
//           name: 'Gia dụng & Nội thất',
//           description: 'Đồ gia dụng, nội thất và trang trí nhà cửa',
//           image: 'https://via.placeholder.com/300x200',
//           product_count: 1800,
//           child_count: 10,
//           is_active: true
//         },
//         {
//           id: 6,
//           name: 'Thể thao & Du lịch',
//           description: 'Dụng cụ thể thao, quần áo thể thao và đồ du lịch',
//           image: 'https://via.placeholder.com/300x200',
//           product_count: 950,
//           child_count: 7,
//           is_active: true
//         }
//       ];

//       setCategories(mockCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     category.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedCategories = [...filteredCategories].sort((a, b) => {
//     switch (sortBy) {
//       case 'name':
//         return a.name.localeCompare(b.name);
//       case 'products':
//         return b.product_count - a.product_count;
//       case 'subcategories':
//         return b.child_count - a.child_count;
//       default:
//         return 0;
//     }
//   });

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/products?category=${categoryId}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Đang tải danh mục...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Danh mục sản phẩm</h1>
//               <p className="text-gray-600 mt-2">Khám phá các danh mục sản phẩm đa dạng</p>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
//                     }`}
//                 >
//                   <Grid3X3 className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
//                     }`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col sm:flex-row gap-4">
//             {/* Search */}
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Tìm kiếm danh mục..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               />
//             </div>

//             {/* Sort */}
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
//               >
//                 <option value="name">Sắp xếp theo tên</option>
//                 <option value="products">Sắp xếp theo số sản phẩm</option>
//                 <option value="subcategories">Sắp xếp theo danh mục con</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Categories Grid/List */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {sortedCategories.length === 0 ? (
//           <div className="text-center py-12">
//             <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy danh mục</h3>
//             <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm</p>
//           </div>
//         ) : (
//           <div className={
//             viewMode === 'grid'
//               ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
//               : 'space-y-4'
//           }>
//             {sortedCategories.map((category) => (
//               <div
//                 key={category.id}
//                 onClick={() => handleCategoryClick(category.id)}
//                 className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 hover:border-red-300 group ${viewMode === 'list' ? 'flex items-center space-x-4 p-6' : ''
//                   }`}
//               >
//                 {viewMode === 'grid' ? (
//                   <>
//                     <div className="relative h-48 overflow-hidden">
//                       <img
//                         src={category.image}
//                         alt={category.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
//                     </div>

//                     <div className="p-6">
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
//                         {category.name}
//                       </h3>
//                       <p className="text-gray-600 mb-4 line-clamp-2">
//                         {category.description}
//                       </p>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4 text-sm text-gray-500">
//                           <div className="flex items-center space-x-1">
//                             <Package className="w-4 h-4" />
//                             <span>{category.product_count} sản phẩm</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <TrendingUp className="w-4 h-4" />
//                             <span>{category.child_count} danh mục con</span>
//                           </div>
//                         </div>

//                         <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-700 transition-colors" />
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
//                       <img
//                         src={category.image}
//                         alt={category.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
//                         {category.name}
//                       </h3>
//                       <p className="text-gray-600 mb-2 line-clamp-1">
//                         {category.description}
//                       </p>

//                       <div className="flex items-center space-x-4 text-sm text-gray-500">
//                         <div className="flex items-center space-x-1">
//                           <Package className="w-4 h-4" />
//                           <span>{category.product_count} sản phẩm</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           <TrendingUp className="w-4 h-4" />
//                           <span>{category.child_count} danh mục con</span>
//                         </div>
//                       </div>
//                     </div>

//                     <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-700 transition-colors" />
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Stats Section */}
//       <div className="bg-white border-t border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-red-700 mb-2">{categories.length}</div>
//               <div className="text-gray-600">Tổng danh mục</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-blue-500 mb-2">
//                 {categories.reduce((sum, cat) => sum + cat.product_count, 0).toLocaleString()}
//               </div>
//               <div className="text-gray-600">Tổng sản phẩm</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-green-500 mb-2">
//                 {categories.reduce((sum, cat) => sum + cat.child_count, 0)}
//               </div>
//               <div className="text-gray-600">Danh mục con</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-purple-500 mb-2">
//                 {Math.round(categories.reduce((sum, cat) => sum + cat.product_count, 0) / categories.length)}
//               </div>
//               <div className="text-gray-600">TB sản phẩm/danh mục</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;

