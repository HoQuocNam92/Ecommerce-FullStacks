import { Button } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectGroup, SelectValue } from "@/components/ui/select";



const ProductsFilters = ({
    inputSearch,
    setInputSearch,
    onSearch,
    categoryId,
    setCategoryId,
    sort,
    setSort,
    categories
}) => {
    return (
        <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">

            <Input
                placeholder="Tìm sản phẩm..."
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                className="w-auto"
            />

            <Button onClick={onSearch}>
                Tìm kiếm
            </Button>

            <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="price_asc">Giá tăng dần</SelectItem>
                    <SelectItem value="price_desc">Giá giảm dần</SelectItem>
                </SelectContent>
            </Select>

            <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                    {categories?.map(c => (
                        <SelectItem key={c.id} value={c.id}>
                            {c.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
export default ProductsFilters;
