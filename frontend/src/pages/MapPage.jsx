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
import RouteIcon from "@mui/icons-material/Route";
import { useNotificationContext } from "../contexts/NotificationContext";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocationSearch from "../components/LocationSearch";
import { useSearchContext } from "../contexts/SearchContext";
import AppBar from "../components/MainAppBar.jsx";

function MapPage({ showMap }) {
  // const mapboxAccessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;

  const {
    itinerary,
    setItinerary,
    updateSavedRoute,
    clearSavedRoute,
    updateDayStartLocation,
  } = useItineraryContext();
  const { showNotification } = useNotificationContext();
  const {
    showRoute,
    setShowRoute,
    handleClickOptimiseRoute,
    optimiseRoute,
    reorderItineraryItems,
    getItemCoordinateList,
    mapboxAccessToken,
    addRoute,
    hideRoute,
    getRoute,
    handleClickShowRoute,
    fitMarkersToViewport,
    mapRef,
    mapContainerRef,
  } = useMapContext();

  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  // const [showRoute, setShowRoute] = useState(false);

  // const mapRef = useRef();
  // const mapContainerRef = useRef();

  // Sets the selectedDayNumber state when the day chip is selected
  const handleDaySelect = (day) => {
    if (day.dayNumber === selectedDayNumber) return;
    setSelectedDayNumber(day.dayNumber);
    hideRoute(mapRef.current);
  };

  const markerRef = useRef();

  const addStartingPin = () => {
    if (!itinerary) return;

    if (markerRef.current) {
      markerRef.current.remove();
    }
    const dayStartLocation = itinerary[selectedDayNumber - 1].dayStartLocation;

    if (!dayStartLocation) return;

    markerRef.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([dayStartLocation.longitude, dayStartLocation.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
          `<h3>${dayStartLocation.name}</h3><p></p>`
        )
      )
      .addTo(mapRef.current);

    const onDragEnd = () => {
      const lngLat = markerRef.current.getLngLat();

      const startLocationData = {
        name: "Custom",
        longitude: lngLat.lng,
        latitude: lngLat.lat,
      };

      updateDayStartLocation(selectedDayNumber, startLocationData);
    };

    markerRef.current.on("dragend", onDragEnd);
  };

  // // This function retrives the coordinates from the user's location search selection
  async function handleLocationSelect(userSelection) {
    if (!userSelection) {
      return;
    }

    const mapbox_id = userSelection.mapbox_id;
    const response = await fetch(
      `http://127.0.0.1:5000/api/location/retrieve?id=${mapbox_id}`
    );
    const data = await response.json(); // Array of objects
    console.log("Inside retrieve API call - map page");
    console.log(data)
    
    updateDayStartLocation(selectedDayNumber, data);
    // setItinerary((prev) =>
    //   prev.map((day) =>
    //     day.dayNumber === selectedDayNumber
    //       ? {
    //           ...day,
    //           dayStartLocation: {
    //             name: data.name,
    //             longitude: data.longitude,
    //             latitude: data.latitude,
    //           },
    //         }
    //       : day
    //   )
    // );
  }

  useEffect(() => {
    addStartingPin();
  }, [itinerary, selectedDayNumber]);

  // Fits markers to viewport automatically when a different day has been selected on the map page
  // or when the itinerary has been updated
  useEffect(() => {
    const day = itinerary[selectedDayNumber - 1];
    if (!day) return;
    const items = day.itineraryItems;
    if (items.length === 0) return;

    fitMarkersToViewport(
      selectedDayNumber, itinerary[selectedDayNumber - 1].itineraryItems,
      mapRef.current
    );
  }, [selectedDayNumber, itinerary]);

  // Updates routes when the itinerary is updated, or the day select has changed on map page
  // If the itinerary item count for the day goes to 0 or 1, the route is removed but show route state remains active
  useEffect(() => {
    if (!mapRef.current) return;
    if (itinerary.length === 0) return;
    const itineraryItems = itinerary[selectedDayNumber - 1].itineraryItems;
    if (itineraryItems.length === 0) return;

    if (showRoute && itineraryItems.length > 1) {
      getRoute(selectedDayNumber, itineraryItems, mapRef.current);
    } else {
      hideRoute(mapRef.current);
    }
  }, [selectedDayNumber, itinerary[selectedDayNumber - 1]?.itineraryItems]);

  // Load the map as soon as the component is mounted
  // useEffect(() => {
  //   let map = mapRef.current;
  //   if (!mapRef.current) {
  //     mapboxgl.accessToken = mapboxAccessToken;
  //     map = (mapRef.current = new mapboxgl.Map({
  //       container: mapContainerRef.current,
  //       center: [2.3514, 48.8575],
  //       zoom: 11,
  //     }));
  //     console.log("NEW MAP LOAD!!!");
  //   }
  // }, []);

  // const handleClickSelectStartLocation = (e) => {
  //   const startLocationData = {
  //     name: "Custom",
  //     longitude: e.lngLat.lng,
  //     latitude: e.lngLat.lat,
  //   };
  //   console.log("selected day: ", selectedDayNumber)

  //   updateDayStartLocation(selectedDayNumber, startLocationData);
  //   console.log(itinerary[selectedDayNumber - 1])
  // }

  // useEffect(() => {

  //   mapRef.current.on("click", (e) => {
  //     handleClickSelectStartLocation(e) 
  //   });
  // }, [itinerary, selectedDayNumber])


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
        <AppBar page={"Map"}/>
        <Box>
          <Typography>Header</Typography>
        </Box>
        <LocationSearch onLocationSelect={handleLocationSelect} placeholderText={"Choose your starting location..."}/>
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
                selectedDayNumber, itinerary[selectedDayNumber - 1].itineraryItems,
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
            sx={{
              backgroundColor: showRoute
                ? "secondary.main"
                : "background.paper",
            }}
            onClick={() => {
              handleClickShowRoute(selectedDayNumber, mapRef.current);
            }}
          >
            <RouteIcon />
          </Fab>
        </Box>
        <Box sx={{ position: "absolute", bottom: 130, right: 180 }}>
          <Fab
            aria-label="add"
            sx={{
              backgroundColor: "background.paper",
            }}
            onClick={() => {
              handleClickOptimiseRoute(selectedDayNumber);
            }}
          >
            <AutoAwesomeIcon />
          </Fab>
        </Box>
        <BottomNav />
      </Box>
    </>
  );
}

export default MapPage;
