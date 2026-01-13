import React, { useEffect, useRef, useState } from "react";
import { Plus, X, CircleX } from "lucide-react";
import { toast } from "sonner"
import {
    Button,
    Input,
    Label,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import useProduct from "@/hooks/useProduct";
import useCategory from "@/hooks/useCategory";
import useProductDetails from "@/hooks/useProductDetails";
import { Spinner } from "@/components/ui/spinner";

import {
    DndContext,
    closestCenter
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formCreateProduct } from "@/schema/formCreateProduct";

const SortableImage = ({ id, src, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
            className="relative cursor-move">
            <CircleX
                className="absolute top-1 right-1 text-red-500 cursor-pointer z-10"
                onClick={onRemove}
            />
            <img src={src} className="h-32 w-32 object-cover rounded shadow" />
        </div>
    );
};

const FormProducts = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const { getCategories } = useCategory();
    const { updateProduct, createProduct, loading } = useProduct();
    const { getProductDetails } = useProductDetails();

    /* ---------- FORM ---------- */
    const [formData, setFormData] = useState({
        id: "",
        name_product: "",
        category_id: "",
        price: "",
        description: ""
    });

    /* ---------- IMAGES ---------- */
    const [oldImages, setOldImages] = useState([]); // từ server
    const [newImages, setNewImages] = useState([]); // file + preview
    const [removeImages, setRemoveImages] = useState([]);

    /* ---------- VARIANT / ATTR ---------- */
    const [variants, setVariants] = useState([]);
    const [attributes, setAttributes] = useState([]);

    /* ---------- LOAD DATA ---------- */
    useEffect(() => {
        if (!slug || !getProductDetails?.data) return;
        const d = getProductDetails.data;

        setFormData({
            id: d.id,
            name_product: d.name_product || "",
            category_id: String(d.category_id || ""),
            price: d.price || "",
            description: d.description || ""
        });

        setOldImages(d.gallery || []);
        setVariants(
            typeof d.variants === "string" ? JSON.parse(d.variants) : d.variants || []
        );
        setAttributes(d.attributes || []);
    }, [slug, getProductDetails?.data]);

    /* ---------- IMAGE UPLOAD ---------- */
    const handleChooseImage = e => {
        const files = Array.from(e.target.files);
        const mapped = files.map(file => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file)
        }));
        setNewImages(prev => [...prev, ...mapped]);
    };

    const removeOldImage = url => {
        setOldImages(prev => prev.filter(i => i.url !== url));
        setRemoveImages(prev => [...prev, url]);
    };

    const removeNewImage = id => {
        setNewImages(prev => prev.filter(i => i.id !== id));
    };

    /* ---------- DRAG SORT ---------- */
    const onDragEnd = e => {
        const { active, over } = e;
        if (!over || active.id === over.id) return;

        setNewImages(items => {
            const oldIndex = items.findIndex(i => i.id === active.id);
            const newIndex = items.findIndex(i => i.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
        });
    };

    const buildValidateData = () => ({
        name: formData.name_product,
        categoryId: formData.category_id,
        price: Number(formData.price),
        description: formData.description,
        attributes,
        variants,
        images: [
            ...oldImages.map(i => i.url), // 🔥 CHỈ LẤY URL
            ...newImages.map(i => i.file)
        ]
    });

    /* ---------- SAVE ---------- */
    const handleSave = async () => {
        const validateData = buildValidateData();
        try {
            await formCreateProduct.validate(validateData, {
                abortEarly: false
            });
        } catch (err) {
            if (err.inner && err.inner.length > 0) {
                err.inner.forEach(e => {
                    toast.error("Lỗi dữ liệu", {
                        description: e.message
                    });
                });
            } else {
                toast.error("Lỗi", {
                    description: err.message
                });
            }
            return;
        }

        const fd = new FormData();

        Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
        fd.append("variants", JSON.stringify(variants));
        fd.append("attributes", JSON.stringify(attributes));
        fd.append("removeImages", JSON.stringify(removeImages));

        if (newImages && newImages.length > 0) {
            newImages.forEach(i => fd.append("gallery", i.file));
        }

        try {
            if (slug) {
                await updateProduct.mutateAsync(fd);
                toast.success("Cập nhật thành công", {
                    description: "Sản phẩm đã được cập nhật 🎉"
                });
                navigate(-1);


            } else {
                await createProduct.mutateAsync(fd);

                toast.success("Tạo sản phẩm thành công", {
                    description: "Sản phẩm  mới đã được tạo 🎉"
                });
                navigate(-1);
            }
        } catch (error) {
            toast.error(`Có lỗi xảy ra ${error}`, {
                description: "Vui lòng thử lại sau"
            });

        }
    };

    if (getProductDetails?.isLoading) return <Spinner />;

    return (
        <div className="bg-white p-6 rounded shadow w-[85%] mx-auto space-y-6">

            <Button variant="outline" onClick={() => navigate(-1)}>Quay lại</Button>

            {/* BASIC */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Tên sản phẩm</Label>
                    <Input
                        value={formData.name_product}
                        onChange={e => setFormData(p => ({ ...p, name_product: e.target.value }))}
                    />
                </div>

                <div>
                    <Label>Danh mục</Label>
                    <Select
                        value={formData.category_id}
                        onValueChange={v => setFormData(p => ({ ...p, category_id: v }))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                            {getCategories?.data?.map(c => (
                                <SelectItem key={c.id} value={String(c.id)}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <Label>Giá</Label>
                <Input
                    value={formData.price}
                    onChange={e => setFormData(p => ({ ...p, price: e.target.value }))}
                />
            </div>
            {/* ATTRIBUTES */}
            <div className="mt-6">
                <Label>Thuộc tính</Label>

                <div className="space-y-2 mt-2">
                    {attributes.map((a, i) => (
                        <div key={i} className="grid grid-cols-4 gap-2 items-center">
                            <Input
                                placeholder="Tên"
                                value={a.key}
                                onChange={e =>
                                    setAttributes(prev => {
                                        const clone = [...prev];
                                        clone[i].key = e.target.value;
                                        return clone;
                                    })
                                }
                            />
                            <Input
                                placeholder="Giá trị"
                                value={a.value}
                                onChange={e =>
                                    setAttributes(prev => {
                                        const clone = [...prev];
                                        clone[i].value = e.target.value;
                                        return clone;
                                    })
                                }
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() =>
                                    setAttributes(prev => prev.filter((_, idx) => idx !== i))
                                }
                            >
                                <X size={14} />
                            </Button>
                        </div>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => setAttributes(prev => [...prev, { key: "", value: "" }])}
                >
                    <Plus size={14} /> Thêm thuộc tính
                </Button>
            </div>
            {/* VARIANTS */}
            <div className="mt-6">
                <Label>Biến thể</Label>

                <div className="space-y-2 mt-2">
                    {variants.map((v, i) => (
                        <div key={i} className="grid grid-cols-4 gap-2 items-center">
                            <Input
                                placeholder="Size"
                                value={v.size}
                                onChange={e =>
                                    setVariants(prev => {
                                        const clone = [...prev];
                                        clone[i].size = e.target.value;
                                        return clone;
                                    })
                                }
                            />
                            <Input
                                placeholder="Màu"
                                value={v.color}
                                onChange={e =>
                                    setVariants(prev => {
                                        const clone = [...prev];
                                        clone[i].color = e.target.value;
                                        return clone;
                                    })
                                }
                            />
                            <Input
                                placeholder="Số lượng"
                                value={v.quantity}
                                onChange={e =>
                                    setVariants(prev => {
                                        const clone = [...prev];
                                        clone[i].quantity = e.target.value;
                                        return clone;
                                    })
                                }
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() =>
                                    setVariants(prev => prev.filter((_, idx) => idx !== i))
                                }
                            >
                                <X size={14} />
                            </Button>
                        </div>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                        setVariants(prev => [...prev, { size: "", color: "", quantity: "" }])
                    }
                >
                    <Plus size={14} /> Thêm biến thể
                </Button>
            </div>

            {/* IMAGES */}
            <div>
                <Label>Hình ảnh</Label>
                <Input type="file" multiple ref={fileRef} onChange={handleChooseImage} />

                {/* OLD */}
                <div className="flex gap-2 mt-3 flex-wrap">
                    {oldImages.map(i => (
                        <div key={i.url} className="relative">
                            <CircleX
                                className="absolute top-1 right-1 text-red-500 cursor-pointer"
                                onClick={() => removeOldImage(i.url)}
                            />
                            <img src={i.url} className="h-32 w-32 rounded object-cover" />
                        </div>
                    ))}
                </div>

                {/* NEW (DRAG) */}
                <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                    <SortableContext items={newImages.map(i => i.id)}>
                        <div className="flex gap-2 mt-3 flex-wrap">
                            {newImages.map(i => (
                                <SortableImage
                                    key={i.id}
                                    id={i.id}
                                    src={i.preview}
                                    onRemove={() => removeNewImage(i.id)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {/* DESCRIPTION */}
            <div>
                <Label>Mô tả</Label>
                <JoditEditor
                    value={formData.description}
                    onChange={v => setFormData(p => ({ ...p, description: v }))}
                />
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => navigate(-1)}>Hủy</Button>
                <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Đang lưu..." : slug ? "Cập nhật" : "Tạo mới"}
                </Button>
            </div>
        </div>
    );
};

export default FormProducts;
