import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapLeaflet = ({ latitude, longitude }) => {
  useEffect(() => {
    const map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map).bindPopup("Profile Location").openPopup();

    return () => {
      map.remove(); 
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
};

export default MapLeaflet;
