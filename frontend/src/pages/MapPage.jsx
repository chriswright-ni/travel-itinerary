import Typography from "@mui/material/Typography";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useMapContext } from "../contexts/MapContext";
import { useItineraryContext } from "../contexts/ItineraryContext";
import ItemMarker from "../components/ItemMarker";
import "mapbox-gl/dist/mapbox-gl.css";
import DaySelector from "../components/DaySelector";
import Fab from "@mui/material/Fab";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import RouteIcon from '@mui/icons-material/Route';

function MapPage({ showMap }) {

  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN

  const { itinerary } = useItineraryContext();

  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [showRoute, setShowRoute] = useState(false);

  const mapRef = useRef();
  const mapContainerRef = useRef();

  // Sets the selectedDayNumber state when the day chip is selected
  const handleDaySelect = (day) => {
    if (day.dayNumber === selectedDayNumber) return;
    setSelectedDayNumber(day.dayNumber);
  };

  // Fits all markers within the map viewport
  const handleClickFitMarkers = (itineraryItems, map) => {
    const bounds = new mapboxgl.LngLatBounds();

    itineraryItems.forEach((item) => {
      bounds.extend([item.longitude, item.latitude]);
    });

    if (itineraryItems.length === 1) {
      map.fitBounds(bounds, { padding: 50, zoom: 13 });
    } else {
      map.fitBounds(bounds, { padding: 50 });
    }
  };

 
  const handleClickShowRoute = (selectedDayNumber, map) => {
    // console.log(itinerary[selectedDayNumber - 1].itineraryItems)
    if (!showRoute) {
      getRoute(itinerary[selectedDayNumber - 1].itineraryItems, map)
      setShowRoute(true);
    } else {
      hideRoute(map);
      setShowRoute(false)
    }
  }

  // Creates a list of coordinates of each item in the itineraryItems array
  // This is generated in the format of longitude,latitude;longitude,latitude
  const getItemCoordinateList = (itineraryItems) => {
    // console.log(itineraryItems)
    const itemCoordinates = itineraryItems.map((item) => [item.longitude, item.latitude]); 
    return itemCoordinates.join(";")
  }

  // Creates a route on the map between each item in the the itinerary items list for 1 day
  const getRoute = async (itineraryItems, map) => {
    console.log(itineraryItems)
    if (!map) return;

    const coordinatesList = getItemCoordinateList(itineraryItems)

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordinatesList}?steps=true&geometries=geojson&access_token=${mapboxAccessToken}`
    );
    const json = await query.json();
    const data = json.routes[0];
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: data.geometry,
    };

    // Replace route if a route already exists on the map
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    }
    else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  };

  const hideRoute = (map) => {
    map.removeLayer("route");
    map.removeSource("route");
  }

  // Load the map as soon as the component is mounted
  useEffect(() => {
    if (!mapRef.current) {
      mapboxgl.accessToken = mapboxAccessToken;
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
        <DaySelector
          onDaySelect={handleDaySelect}
          selected={selectedDayNumber}
        />
        <Box
          id="map-container"
          ref={mapContainerRef}
          sx={{
            flex: 1,
            "& .mapboxgl-ctrl-bottom-left": { mb: "60px", ml: "5px" },
            "& .mapboxgl-ctrl-bottom-right": { mb: "55px", mr: "5px" },
          }}
        ></Box>
        {mapRef.current &&
          itinerary[selectedDayNumber - 1].itineraryItems.map(
            (place, index) => (
              <ItemMarker
                key={place.id}
                map={mapRef.current}
                latitude={place.latitude}
                longitude={place.longitude}
                itemNumber={index + 1}
                placeName={place.name}
              />
            )
          )}
        <Box sx={{ position: "absolute", bottom: 110, right: 20 }}>
          <Fab
            aria-label="add"
            sx={{ backgroundColor: "background.paper" }}
            onClick={() =>
              handleClickFitMarkers(
                itinerary[selectedDayNumber - 1].itineraryItems,
                mapRef.current
              )
            }
          >
            <CenterFocusStrongIcon />
          </Fab>
        </Box>
        <Box sx={{ position: "absolute", bottom: 110, right: 100 }}>
          <Fab
            aria-label="add"
            sx={{ backgroundColor: "background.paper" }}
            onClick={() =>
              handleClickShowRoute(selectedDayNumber, mapRef.current)
            }
          >
            <RouteIcon />
          </Fab>
        </Box>
        <BottomNav />
      </Box>
    </>
  );
}

export default MapPage;
