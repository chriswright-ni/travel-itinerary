import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import theme from "../themes/theme_five.js";

function ItemMarker({ map, latitude, longitude, itemNumber }) {
  
  const el = document.createElement('div');
  el.className = "item-marker"
  el.style.backgroundColor = `${theme.palette.secondary.main}`
  el.textContent = itemNumber
  el.style.fontSize = "24px"
  el.style.width = "36px";
  el.style.height = "36px";
  el.style.borderRadius = "50%";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center"
  el.style.fontWeight = "bold"
  el.style.color = "#ffffff"

  

  const markerRef = useRef();


  useEffect(() => {
    if (!map) return;

    markerRef.current = new mapboxgl.Marker(el)
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            `<h3>Eiffel Tower</h3><p></p>`
          )
      )
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  }, [map, latitude, longitude, itemNumber]);

  return null;
}

export default ItemMarker;
