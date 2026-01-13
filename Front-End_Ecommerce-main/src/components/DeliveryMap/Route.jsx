// import axios from "axios"

// export const Routing = async (start, end) => {
//     const res = await axios.get(`http://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=full&geometries=geojson`);
//     return res.data.routes[0].geometry.coordinates.map((coor) => [coor[1], coor[0]])
// }