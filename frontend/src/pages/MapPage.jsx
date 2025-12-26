import Typography from "@mui/material/Typography";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useMapContext } from "../contexts/MapContext";
import { useItineraryContext } from "../contexts/ItineraryContext";
import ItemMarker from "../components/ItemMarker";
import "mapbox-gl/dist/mapbox-gl.css";

function MapPage({ showMap }) {
  const { itinerary } = useItineraryContext();

  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    if (!mapRef.current) {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [2.3514, 48.8575],
        zoom: 11,
      });
      console.log("NEW MAP LOAD!!!");
    }
  }, []);

  // When navigating to the map page, the following code resizes the map to the container after it was hidden
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  }, [showMap]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "100vh",
        }}
      >
        <Box>
          <Typography>Header</Typography>
        </Box>
        <Box id="map-container" ref={mapContainerRef} sx={{ flex: 1 }}></Box>
        {mapRef.current &&
          itinerary[0].itineraryItems.map((place) => (
            <ItemMarker
              key={place.id}
              map={mapRef.current}
              latitude={place.latitude}
              longitude={place.longitude}
            />
          ))}
        <BottomNav />
      </Box>
    </>
  );
}

export default MapPage;
