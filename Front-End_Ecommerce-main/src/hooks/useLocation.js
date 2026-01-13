import { useEffect, useState } from "react";
import * as AddressServices from "@/services/LocationServices";

export default function useLocation() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProvinces = async () => {
            setLoading(true);
            try {
                const { data } = await AddressServices.Provinces();
                setProvinces(data);
            } catch (err) {
                console.error("Error loading provinces:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (!selectedProvince) return;
        const getDistricts = async () => {
            setLoading(true);
            try {
                const { data } = await AddressServices.Districts(selectedProvince);
                setDistricts(data);
                setWards([]);
            } catch (err) {
                console.error("Error loading districts:", err);
            } finally {
                setLoading(false);
            }
        };
        getDistricts();
    }, [selectedProvince]);

    useEffect(() => {
        if (!selectedDistrict) return;
        const getWards = async () => {
            setLoading(true);
            try {
                const { data } = await AddressServices.Wards(selectedDistrict);
                setWards(data);
            } catch (err) {
                console.error("Error loading wards:", err);
            } finally {
                setLoading(false);
            }
        };
        getWards();
    }, [selectedDistrict]);

    return {
        provinces,
        districts,
        wards,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        setSelectedProvince,
        setSelectedDistrict,
        setSelectedWard,
        loading,
    };
}
