import { useState } from "react";
import useAddress from "@/hooks/useLocation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label } from "@/components/ui";

export default function AddressSelector({ onChange }) {
    const { provinces, districts, wards, getDistricts, getWards, loading } = useAddress();
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");

    const handleProvinceChange = (value) => {
        setProvince(value);
        setDistrict("");
        setWard("");
        getDistricts(value);
        onChange?.({ province: value, district: "", ward: "" });
    };

    const handleDistrictChange = (value) => {
        setDistrict(value);
        setWard("");
        getWards(value);
        onChange?.({ province, district: value, ward: "" });
    };

    const handleWardChange = (value) => {
        setWard(value);
        onChange?.({ province, district, ward: value });
    };

    return (
        <div className="space-y-4">
            <div>
                <Label>Tỉnh / Thành phố</Label>
                <Select value={province} onValueChange={handleProvinceChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn tỉnh thành" />
                    </SelectTrigger>
                    <SelectContent>
                        {provinces.map((p) => (
                            <SelectItem key={p.code} value={String(p.code)}>
                                {p.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Quận / Huyện</Label>
                <Select value={district} onValueChange={handleDistrictChange} disabled={!province || loading}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn quận huyện" />
                    </SelectTrigger>
                    <SelectContent>
                        {districts.map((d) => (
                            <SelectItem key={d.code} value={String(d.code)}>
                                {d.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Phường / Xã</Label>
                <Select value={ward} onValueChange={handleWardChange} disabled={!district || loading}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn phường xã" />
                    </SelectTrigger>
                    <SelectContent>
                        {wards.map((w) => (
                            <SelectItem key={w.code} value={String(w.code)}>
                                {w.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
