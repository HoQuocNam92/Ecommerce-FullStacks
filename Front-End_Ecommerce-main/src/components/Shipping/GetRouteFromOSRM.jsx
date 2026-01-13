// src/GetRouteFromOSRM.js
import axios from "axios";

const GetRouteFromOSRM = async (start, end) => {
  try {
    const res = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`,
    );
    return res.data.routes[0].geometry.coordinates.map(([lng, lat]) => [
      lat,
      lng,
    ]);
  } catch (error) {
    console.error("Lỗi lấy route:", error);
    return [];
  }
};

export default GetRouteFromOSRM;
