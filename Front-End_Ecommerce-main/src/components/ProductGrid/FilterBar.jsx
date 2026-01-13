import { useEffect, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useBrand from "@/hooks/useBrand";
import useCategory from "@/hooks/useCategory";

const SortSelect = ({ value, onChange }) => (
    <select className="border rounded px-2 py-1 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Sắp xếp</option>
        <option value="price_asc">Giá: Thấp → Cao</option>
        <option value="price_desc">Giá: Cao → Thấp</option>
        <option value="rating_desc">Đánh giá: Cao → Thấp</option>
        <option value="name_asc">Tên: A → Z</option>
    </select>
);

const MultiCheck = ({ items, selected, setSelected, labelKey = 'name', idKey = 'id', buttonLabel }) => (
    <Popover>
        <PopoverTrigger className="border rounded px-2 py-1 text-sm bg-white">
            {buttonLabel} {selected.length ? `(${selected.length})` : ''}
        </PopoverTrigger>
        <PopoverContent className="w-64">
            <div className="max-h-64 overflow-auto space-y-2">
                {items.map((it) => {
                    const id = String(it[idKey]);
                    const checked = selected.includes(id);
                    return (
                        <label key={id} className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                    if (e.target.checked) setSelected([...selected, id]);
                                    else setSelected(selected.filter((x) => x !== id));
                                }}
                            />
                            <span>{it[labelKey]}</span>
                        </label>
                    );
                })}
            </div>
        </PopoverContent>
    </Popover>
);

const PriceRange = ({ min, max, value, onChange }) => {
    const [minVal, setMinVal] = useState(value.min ?? min);
    const [maxVal, setMaxVal] = useState(value.max ?? max);

    useEffect(() => { setMinVal(value.min ?? min); setMaxVal(value.max ?? max); }, [value.min, value.max, min, max]);

    const onMin = (v) => {
        const nv = Math.min(Number(v), maxVal);
        setMinVal(nv); onChange({ min: nv, max: maxVal });
    };
    const onMax = (v) => {
        const nv = Math.max(Number(v), minVal);
        setMaxVal(nv); onChange({ min: minVal, max: nv });
    };

    return (
        <div className="flex items-center gap-2">
            <input type="number" className="w-24 border rounded px-2 py-1 text-sm" value={minVal} onChange={(e) => onMin(e.target.value)} />
            <span className="text-gray-400">-</span>
            <input type="number" className="w-24 border rounded px-2 py-1 text-sm" value={maxVal} onChange={(e) => onMax(e.target.value)} />
        </div>
    );
};

const FilterBar = ({ state, onChange, chips, onRemoveChip, onClearAll }) => {
    const { brand } = useBrand();
    const { categories } = useCategory();

    const priceBounds = useMemo(() => ({ min: 0, max: 100000000 }), []);

    return (
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
            <div className="container flex flex-wrap items-center gap-3 py-3">
                <PriceRange min={priceBounds.min} max={priceBounds.max} value={state.price} onChange={(v) => onChange({ ...state, price: v })} />
                <MultiCheck items={brand || []} selected={state.brands} setSelected={(v) => onChange({ ...state, brands: v })} labelKey="name" idKey="id" buttonLabel="Thương hiệu" />
                <MultiCheck items={categories || []} selected={state.categories} setSelected={(v) => onChange({ ...state, categories: v })} labelKey="name" idKey="id" buttonLabel="Danh mục" />
                <SortSelect value={state.sort} onChange={(v) => onChange({ ...state, sort: v })} />
                {chips.length > 0 && (
                    <button className="ml-auto text-sm text-blue-600 hover:underline" onClick={onClearAll}>Xóa tất cả</button>
                )}
            </div>
            {chips.length > 0 && (
                <div className="container pb-3 -mt-2 flex flex-wrap gap-2">
                    {chips.map((chip) => (
                        <button key={chip.key} className="text-xs border rounded-full px-2 py-1 bg-gray-50 hover:bg-gray-100" onClick={() => onRemoveChip(chip)}>
                            {chip.label} ×
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterBar;



