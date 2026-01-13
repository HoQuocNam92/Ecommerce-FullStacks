// import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
// import L from "leaflet";
// import { useEffect } from "react";

// // Icons
// const greenIcon = new L.Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });

// const redIcon = new L.Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });

// const motobikeIcon = new L.Icon({
//     iconUrl: '/images/delivery.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
// });

// // Component fit bounds tự động theo route
// const FitBounds = ({ warehouse, customer, path }) => {
//     const map = useMap();

//     useEffect(() => {
//         const points = [];
//         if (warehouse?.lat && warehouse?.lon) points.push([warehouse.lat, warehouse.lon]);
//         if (customer?.lat && customer?.lon) points.push([customer.lat, customer.lon]);
//         if (path?.length) points.push(...path);

//         if (points.length) {
//             const bounds = L.latLngBounds(points);
//             map.fitBounds(bounds, { padding: [50, 50] });
//         }
//     }, [map, warehouse, customer, path]);

//     return null;
// };

// const DeliveryMap = ({ warehouse, customer, path, shipPos }) => {
//     return (
//         <MapContainer
//             className="w-full h-96"
//             center={[warehouse.lat, warehouse.lon]}
//             zoom={11}
//             scrollWheelZoom={false}
//         >
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* Markers */}
//             {warehouse?.lat && warehouse?.lon && (
//                 <Marker position={[warehouse.lat, warehouse.lon]} icon={greenIcon}>
//                     <Popup>Kho hàng</Popup>
//                 </Marker>
//             )}

//             {customer?.lat && customer?.lon && (
//                 <Marker position={[customer.lat, customer.lon]} icon={redIcon}>
//                     <Popup>Khách hàng</Popup>
//                 </Marker>
//             )}

//             {shipPos && <Marker position={shipPos} icon={motobikeIcon}>
//                 <Popup>Shipper đang giao 🛵</Popup>
//             </Marker>}

//             {/* Route Polyline */}
//             {path?.length > 0 && <Polyline positions={path} color="blue" />}

//             {/* Fit bounds tự động */}
//             <FitBounds warehouse={warehouse} customer={customer} path={path} />
//         </MapContainer>
//     );
// };

// export default DeliveryMap;
