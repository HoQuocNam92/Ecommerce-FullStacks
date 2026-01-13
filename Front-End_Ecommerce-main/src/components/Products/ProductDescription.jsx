import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, Package, Truck, Shield, MessageSquare } from "lucide-react";

const MAX_CHARS = 220;

const ProductDescription = ({ description = "", specifications = [], shipping = "Giao hàng nhanh trong 2-5 ngày làm việc.", warranty = "Bảo hành chính hãng 12 tháng." }) => {
    const [expanded, setExpanded] = useState(false);

    const isLong = description && description.length > MAX_CHARS;
    const visibleText = useMemo(() => {
        if (!description) return "Chưa có mô tả";
        if (expanded || !isLong) return description;
        return description.slice(0, MAX_CHARS) + "...";
    }, [description, expanded, isLong]);

    return (
        <div className="pt-2 bg-white rounded-2xl">
            <Tabs defaultValue="mo-ta" className="w-full">
                <TabsList className="w-full justify-start gap-1  ">
                    <TabsTrigger value="mo-ta" className="gap-2">
                        <Info size={16} />
                        Mô tả
                    </TabsTrigger>
                    <TabsTrigger value="thong-so" className="gap-2">
                        <Package size={16} />
                        Thông số
                    </TabsTrigger>
                    <TabsTrigger value="van-chuyen" className="gap-2">
                        <Truck size={16} />
                        Vận chuyển
                    </TabsTrigger>
                    <TabsTrigger value="bao-hanh" className="gap-2">
                        <Shield size={16} />
                        Bảo hành
                    </TabsTrigger>

                </TabsList>

                <TabsContent value="mo-ta">
                    <div className="rounded-md border p-4 sm:p-5">
                        <p dangerouslySetInnerHTML={{ __html: visibleText }} className="text-gray-700 leading-7 whitespace-pre-line text-[15px]"></p>
                        {isLong && (
                            <button type="button" className="mt-2 text-sm text-blue-600 hover:underline" onClick={() => setExpanded(v => !v)}>
                                {expanded ? "Thu gọn" : "Xem thêm"}
                            </button>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="thong-so">
                    <div className="rounded-md border p-4 sm:p-5">
                        {Array.isArray(specifications) && specifications.length > 0 ? (
                            <ul className="grid  gap-2 text-sm ">
                                {specifications.map((spec, idx) => (
                                    <li key={idx} className="flex items-start justify-between gap-4 border-b pb-2 last:border-none">
                                        <span className="text-gray-500">{spec?.key || "Thuộc tính"}</span>
                                        <span className="font-medium text-gray-800">{spec?.value || "-"}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Chưa có thông số</p>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="van-chuyen">
                    <div className="rounded-md border p-4 sm:p-5">
                        <ScrollArea className="h-24">
                            <p className="text-gray-700 whitespace-pre-line text-[15px]">{shipping}</p>
                        </ScrollArea>
                    </div>
                </TabsContent>

                <TabsContent value="bao-hanh">
                    <div className="rounded-md border p-4 sm:p-5">
                        <p className="text-gray-700 whitespace-pre-line text-[15px]">{warranty}</p>
                    </div>
                </TabsContent>


            </Tabs>
        </div>
    );
};

export default ProductDescription;


