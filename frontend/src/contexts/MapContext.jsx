
import { createContext, useContext, useState, useRef } from "react";
import { useItineraryContext } from "../contexts/ItineraryContext";
import { useNotificationContext } from "../contexts/NotificationContext";
import mapboxgl from "mapbox-gl";

const MapContext = createContext()

export const useMapContext = () => useContext(MapContext)

export const MapProvider = ({children}) => {

  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;
  const { itinerary, setItinerary, updateSavedRoute, clearSavedRoute} =
  useItineraryContext();
  const { showNotification } = useNotificationContext();

  const [showRoute, setShowRoute] = useState(false);

  const mapRef = useRef();
  const mapContainerRef = useRef();
 

  // Fits all markers within the map viewport
  const fitMarkersToViewport = (dayNumber, itineraryItems, map) => {
    if (!map) return;
    if (itineraryItems.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();

    itineraryItems.forEach((item) => {
      bounds.extend([item.longitude, item.latitude]);
    });
    
    const dayStartLocationData = itinerary[dayNumber - 1].dayStartLocation
    if (dayStartLocationData) {
      bounds.extend([dayStartLocationData.longitude, dayStartLocationData.latitude])
    }

    if (itineraryItems.length === 1 && !dayStartLocationData) {
      // map.fitBounds(bounds, { padding: 50, zoom: 13.5 });
      map.flyTo({
        center: [itineraryItems[0].longitude, itineraryItems[0].latitude],
        zoom: 13,
      });
    } else {
      map.fitBounds(bounds, { padding: 50 });
    }
  };

  // Toggles the route view
  const handleClickShowRoute = (selectedDayNumber, map) => {
    const itineraryItems = itinerary[selectedDayNumber - 1].itineraryItems;
    const dayStartLocationData = itinerary[selectedDayNumber - 1].dayStartLocation
    if (!showRoute) {
      if (itineraryItems.length === 0 && !dayStartLocationData) {
        showNotification("Add 2 more location to see a route");
        return;
      }
      if (itineraryItems.length === 1 && !dayStartLocationData) {
        showNotification("Add 1 more location to see a route");
        return;
      }
      if (itineraryItems.length === 0 && dayStartLocationData) {
        showNotification("Add 1 more location to see a route");
        return;
      }
      getRoute(selectedDayNumber, itineraryItems, map);
      setShowRoute(true);
    } else {
      hideRoute(map);
      setShowRoute(false);
    }
  };

  const handleClickOptimiseRoute = (selectedDayNumber) => {
    console.log("INSIDE OPTIMISE ROUTE")
    const map = mapRef.current
    const itineraryItems = itinerary[selectedDayNumber - 1].itineraryItems;
    const dayStartLocationData = itinerary[selectedDayNumber - 1].dayStartLocation
   
  
    if (itinerary[selectedDayNumber - 1].optimised) {
      showNotification("Route already optimised")
      console.log("route already optimised")
      if (!showRoute) {
        setShowRoute(true)
        getRoute(selectedDayNumber, itineraryItems, map)
      }
    } else {  
      if (itineraryItems.length < 3 && !dayStartLocationData) {
        showNotification("Add at least 3 locations to optimise route");
        return;
      }
      if (itineraryItems.length < 2 && dayStartLocationData) {
        showNotification("Add at least 3 locations to optimise route");
        return;
      }
      optimiseRoute(selectedDayNumber, itineraryItems, map)
      if (!showRoute) {
        setShowRoute(true)
      }
      
    } 
    
      
  };

  const optimiseRoute = async (dayNumber, itineraryItems, map) => {
    if (!map) return;

    if (itineraryItems.length < 2) return;

    const coordinatesList = getItemCoordinateList(dayNumber, itineraryItems);

    console.log("Optimisation API called");
    // console.log(itineraryItems)
    const query = await fetch(
      `https://api.mapbox.com/optimized-trips/v1/mapbox/walking/${coordinatesList}?geometries=geojson&roundtrip=false&source=first&destination=last&access_token=${mapboxAccessToken}`
    );
    const json = await query.json();
    // console.log("response: ", json)
    const tripsData = json.trips;
    const geometry = tripsData[0].geometry;
    const waypointsData = json.waypoints

    // Create array of the waypoint_index values returned from the optimisation API response
    // Note: The order of these waypoint_index values are the same order as the coordinates used for the API call
    // These values and order are used to reorder the itinerary
    const waypointIndexValues = []
    for (let waypoint of waypointsData) {
      waypointIndexValues.push(waypoint.waypoint_index);
    }


    reorderItineraryItems(dayNumber, itineraryItems, waypointIndexValues)
  };

  const reorderItineraryItems = (dayNumber, itineraryItems, waypointIndexValues) => {
    
    // console.log("In reorderItineraryItems")
    const itineraryItemsReordered = []

    // console.log("itineraryItems")
    // console.log(itineraryItems)

    // console.log("loop")

    console.log(waypointIndexValues)
    // If the day has a starting location, remove this from the waypoints index array
    const dayStartLocationData = itinerary[dayNumber - 1].dayStartLocation
    if (dayStartLocationData) {
      waypointIndexValues.shift()
      // Reduce all index values by 1 to align with itinerary item array indexes
      waypointIndexValues = waypointIndexValues.map((index) => index - 1)
    }
    console.log(waypointIndexValues)

    for (let i = 0; i < waypointIndexValues.length; i++) {
      const index = waypointIndexValues[i];
      console.log(index);
      const item = itineraryItems[index];
      console.log(item)
      // itineraryItemsReordered.push(itineraryItems[index]);
      itineraryItemsReordered.push(item);
      // console.log(itineraryItemsReordered)
    }
    // console.log("before setItinerary")
    console.log("Test point 1")

    setItinerary((prev) => 
      prev.map((day) => 
        day.dayNumber === dayNumber ? {
          ...day,
          itineraryItems: [...itineraryItemsReordered],
          route: null,
          optimised: true
        } : day
      )
    )
    console.log("Test point 2")
  }


  // Creates a list of coordinates of each item in the itineraryItems array
  // This is generated in the format of longitude,latitude;longitude,latitude
  const getItemCoordinateList = (dayNumber, itineraryItems) => {
    // console.log(itineraryItems)
    const itemCoordinates = itineraryItems.map((item) => [
      item.longitude,
      item.latitude,
    ]);

    const dayStartLocationData = itinerary[dayNumber - 1].dayStartLocation
    if (dayStartLocationData) {
      const startingCoordinates = [dayStartLocationData.longitude, dayStartLocationData.latitude]
      itemCoordinates.unshift(startingCoordinates)
    }
    return itemCoordinates.join(";");
  };

  // Creates a route on the map between each item in the the itinerary items list for 1 day
  const getRoute = async (dayNumber, itineraryItems, map) => {
    if (!map) return;

    if (itineraryItems.length < 1) return;

    let geometry = null;

    // Check if route already exists in day object
    if (itinerary[dayNumber - 1].route) {
      // console.log("TEST POINT - IF");
      geometry = itinerary[dayNumber - 1].route.geometry;
      addRoute(mapRef.current, geometry);

      // If route is null, call the API
    } else {
      // console.log("TEST POINT - ELSE");
      const coordinatesList = getItemCoordinateList(dayNumber, itineraryItems);

      console.log("Directions API called");
      console.log(itineraryItems);
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinatesList}?geometries=geojson&access_token=${mapboxAccessToken}`
      );
      const json = await query.json();
      const data = json.routes[0];
      // console.log(json)
      geometry = data.geometry;
      // console.log("normal route geo: ", geometry)
      // console.log("LEGS: ", data.legs);

      const legs = data.legs;

      const legsData = legs.map((leg) => {
        return {
          distance: (leg.distance / 1000).toFixed(1),
          duration: leg.duration,
        };
      });

      const route = {
        geometry: geometry,
        distance: (data.distance / 1000).toFixed(1), // convert distance to km
        duration: data.duration,
        legs: legsData,
      };
      // console.log(route);
      // Store the new route in the day object
      updateSavedRoute(dayNumber, route);
    }

    addRoute(mapRef.current, geometry);
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
    } else {
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

  // Hides the route on the map, if the map contains a route
  const hideRoute = (map) => {
    if (map.getLayer("route")) {
      map.removeLayer("route");
    }
    if (map.getSource("route")) {
      map.removeSource("route");
    }
  };

  const value = {
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
    mapContainerRef
  }

  return <MapContext.Provider value = {value}>
    {children}
  </MapContext.Provider>
}
