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
import { useNotificationContext } from "../contexts/NotificationContext";


function MapPage({ showMap }) {

  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN

  const { itinerary, updateSavedRoute, clearSavedRoute } = useItineraryContext();
  const { showNotification } = useNotificationContext();

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
  const fitMarkersToViewport = (itineraryItems, map) => {
    
    if (!map) return;
    if (itineraryItems.length === 0) return;
    
    const bounds = new mapboxgl.LngLatBounds();

    itineraryItems.forEach((item) => {
      bounds.extend([item.longitude, item.latitude]);
    });

    if (itineraryItems.length === 1) {
      // map.fitBounds(bounds, { padding: 50, zoom: 13.5 });
      map.flyTo({center: [itineraryItems[0].longitude, itineraryItems[0].latitude], zoom: 13});
    } else {
      map.fitBounds(bounds, { padding: 50 });
    }
  };

 
  // Toggles the route view
  const handleClickShowRoute = (selectedDayNumber, map) => {
    // console.log(itinerary[selectedDayNumber - 1].itineraryItems)
    const itineraryItems = itinerary[selectedDayNumber - 1].itineraryItems;
    if (!showRoute) {
      getRoute(selectedDayNumber, itineraryItems, map)
      setShowRoute(true);
      if (itineraryItems.length === 0) {
        showNotification("Add 2 more items to see a route")
      }
      if (itineraryItems.length === 1) {
        showNotification("Add 1 more item to see a route")
      }
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
  const getRoute = async (dayNumber, itineraryItems, map) => {
    if (!map) return;
    
    if (itineraryItems.length < 2) return;
    
    let geometry = null;
    
    // Check if route already exists in day object
    if (itinerary[dayNumber - 1].route) {
      console.log("TEST POINT - IF")
      geometry = itinerary[dayNumber - 1].route.geometry
      addRoute(mapRef.current, geometry)
      
    // If route is null, call the API
    } else {
      
      console.log("TEST POINT - ELSE")
      const coordinatesList = getItemCoordinateList(itineraryItems)
      
      console.log("Directions API called")
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinatesList}?steps=true&geometries=geojson&access_token=${mapboxAccessToken}`
      );
      const json = await query.json();
      const data = json.routes[0];
      
      geometry = data.geometry
      console.log("LEGS: ", data.legs)

      const legs = data.legs;

      const legsData = legs.map(leg => {

        return {
          distance: (leg.distance / 1000).toFixed(1),
          duration: leg.duration
        }
      })

      
      
      const route = {
        geometry: geometry,
        distance: (data.distance / 1000).toFixed(1), // convert distance to km
        duration: data.duration,
        legs: legsData
      }
      console.log(route)
      // Store the new route in the day object
      updateSavedRoute(dayNumber, route)
    }
    
    addRoute(mapRef.current, geometry)
  };

  // Add route to the map using route geometry
  const addRoute = (map, geometry) => {

    const geojson = {
      type: "Feature",
      properties: {},
      geometry: geometry,
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
  }

  // Hides the route on the map, if the map contains a route
  const hideRoute = (map) => {
    if (map.getLayer("route")) {
      map.removeLayer("route");
    }
    if (map.getSource("route")) {
      map.removeSource("route");
    }
  }

  // Fits markers to viewport automatically when a different day has been selected on the map page
  // or when the itinerary has been updated
  useEffect(() => {
    const day = itinerary[selectedDayNumber - 1];
    if (!day) return;
    const items = day.itineraryItems;
    if (items.length === 0) return;

    fitMarkersToViewport(itinerary[selectedDayNumber - 1].itineraryItems, mapRef.current)
  }, [selectedDayNumber, itinerary])

  // Updates routes when the itinerary is updated, or the day select has changed on map page
  // If the itinerary item count for the day goes to 0 or 1, the route is removed but show route state remains active
  useEffect(() => {
    
    if (!mapRef.current) return;
    if (itinerary.length === 0) return;
    const itineraryItems = itinerary[selectedDayNumber - 1].itineraryItems;
    if (itineraryItems.length === 0) return;

    if (showRoute && itineraryItems.length > 1) {
      getRoute(selectedDayNumber, itineraryItems, mapRef.current)
    } else {
      hideRoute(mapRef.current)
    }
  }, [selectedDayNumber, itinerary[selectedDayNumber - 1]?.itineraryItems])

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
          itinerary[selectedDayNumber - 1]?.itineraryItems.map(
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
        <Box sx={{ position: "absolute", bottom: 130, right: 20 }}>
          <Fab
            aria-label="add"
            sx={{ backgroundColor: "background.paper" }}
            onClick={() =>
              fitMarkersToViewport(
                itinerary[selectedDayNumber - 1].itineraryItems,
                mapRef.current
              )
            }
          >
            <CenterFocusStrongIcon />
          </Fab>
        </Box>
        <Box sx={{ position: "absolute", bottom: 130, right: 100 }}>
          <Fab
            aria-label="add"
            sx={{ backgroundColor: showRoute ? "secondary.main" : "background.paper" }}
            onClick={() => {
              handleClickShowRoute(selectedDayNumber, mapRef.current)}
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
