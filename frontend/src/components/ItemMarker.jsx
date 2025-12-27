import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

function ItemMarker({ map, latitude, longitude, itemNumber }) {
  
  const el = document.createElement('div');
  el.className = "item-marker"
  el.style.backgroundColor = "white"
  el.textContent = itemNumber
  el.style.fontSize = "20px"
  el.style.width = "30px";
  el.style.height = "30px";
  

  const markerRef = useRef();


  useEffect(() => {
    if (!map) return;

    markerRef.current = new mapboxgl.Marker(el)
      // .setLngLat([54.5973, -5.9301])
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  }, [map, latitude, longitude, itemNumber]);

  return null;
}

export default ItemMarker;
