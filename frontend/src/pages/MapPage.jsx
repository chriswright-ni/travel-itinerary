import Typography from "@mui/material/Typography";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useMapContext } from "../contexts/MapContext";

function MapPage() {


  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-5.9301, 54.5973],
      zoom: 11,
    });
    console.log("NEW MAP LOAD!!!")

    return () => {
      mapRef.current.remove();
    };
  });

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
        <Box id="map-container" ref={mapContainerRef} sx={{flex: 1}}></Box>
        <BottomNav />
      </Box>
    </>
  );
}

export default MapPage;
