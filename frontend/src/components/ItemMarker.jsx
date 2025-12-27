import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

function ItemMarker({ map, latitude, longitude }) {
  
  const markerRef = useRef();


  useEffect(() => {
    if (!map) return;

    markerRef.current = new mapboxgl.Marker()
      // .setLngLat([54.5973, -5.9301])
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  }, []);

  return null;
}

export default ItemMarker;
