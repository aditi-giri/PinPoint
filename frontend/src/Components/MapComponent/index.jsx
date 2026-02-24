import dynamic from "next/dynamic";
import { useEffect, useState } from "react";


const Map = dynamic(() => import("../MapLeaflet/index.jsx"), { ssr: false });

const MapComponent = ({ latitude, longitude }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  console.log("MapComponent re-rendered");

  if (!mounted) return <p>Loading Map...</p>;

  return <Map latitude={latitude} longitude={longitude} />;
};

export default MapComponent;
