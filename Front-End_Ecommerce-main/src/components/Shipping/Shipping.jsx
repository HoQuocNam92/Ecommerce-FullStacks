// src/Shipping.jsx
import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import GetLatLngFromAddress from "./getLatLngFromAddress";
import GetRouteFromOSRM from "./GetRouteFromOSRM";

const Shipping = () => {
  const [route, setRoute] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [shipperPos, setShipperPos] = useState(null);
  const indexRef = useRef(0);

  useEffect(() => {
    async function fetchData() {
      let warehouse = await GetLatLngFromAddress("123 Lê Lợi, Quận 1, TP.HCM");
      let customer = await GetLatLngFromAddress(
        "456 Nguyễn Huệ, Quận 1, TP.HCM",
      );

      // fallback nếu API trả về null
      if (!warehouse) warehouse = { lat: 10.776889, lng: 106.700806 };
      if (!customer) customer = { lat: 10.772583, lng: 106.704033 };

      setStart(warehouse);
      setEnd(customer);

      const path = await GetRouteFromOSRM(warehouse, customer);
      setRoute(path);
      setShipperPos(path[0]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (route.length > 0) {
      const interval = setInterval(() => {
        indexRef.current += 1;
        if (indexRef.current < route.length) {
          setShipperPos(route[indexRef.current]);
        } else {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [route]);

  const shipperIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/912/912214.png",
    iconSize: [40, 40],
  });

  return (
    <div style={{ height: "500px", width: "100%" }}>
      {start && end && (
        <MapContainer
          center={start}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker
            position={start}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
              iconSize: [32, 32],
            })}
          />
          <Marker
            position={end}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: [32, 32],
            })}
          />
          <Polyline positions={route} color="blue" />
          {shipperPos && <Marker position={shipperPos} icon={shipperIcon} />}
        </MapContainer>
      )}
    </div>
  );
};

export default Shipping;
