// src/getLatLngFromAddress.js
import axios from "axios";

const GetLatLngFromAddress = async (address) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      {
        headers: {
          "User-Agent": "demo-map-app", // Nominatim yêu cầu header này
        },
      },
    );
    const data = res.data;
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
  } catch (error) {
    console.error("Lỗi lấy tọa độ:", error);
  }
  return null; // không tìm thấy
};

export default GetLatLngFromAddress;
