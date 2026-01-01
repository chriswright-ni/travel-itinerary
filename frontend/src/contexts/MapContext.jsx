
// DELETE THIS FILE IF ITS NOT NEEDED
// This was created to attempt to solve the problem of the map calling the API
// every time the user navigated to the map page
// This still didn't solve the issue.  For now, the map page is not part of the routes,
// it is always mounted when the app is running.

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
 

  // const addStartingPin = () => {
  //   markerRef.current = new mapboxgl.Marker()
  //     .setLngLat([locationData.longitude, locationData.latitude])
  //     .setPopup(
  //       new mapboxgl.Popup({ offset: 25, closeButton: false })
  //         .setHTML(
  //           `<h3>${locationData.name}</h3><p></p>`
  //         )
  //     )
  //     .addTo(map);
  // }

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
    // console.log(itinerary[selectedDayNumber - 1].itineraryItems)
    const itineraryItems = itinerary[selectedDayNumber - 1].itineraryItems;
    if (!showRoute) {
      getRoute(selectedDayNumber, itineraryItems, map);
      setShowRoute(true);
      if (itineraryItems.length === 0) {
        showNotification("Add 2 more items to see a route");
      }
      if (itineraryItems.length === 1) {
        showNotification("Add 1 more item to see a route");
      }
    } else {
      hideRoute(map);
      setShowRoute(false);
    }
  };

  const handleClickOptimiseRoute = (selectedDayNumber) => {
    console.log("INSIDE OPTIMISE ROUTE")
    const map = mapRef.current
    const itineraryItems = itinerary[selectedDayNumber - 1].itineraryItems;
  
    if (itinerary[selectedDayNumber - 1].optimised) {
      showNotification("Route already optimised")
      console.log("route already optimised")
      if (!showRoute) {
        setShowRoute(true)
        getRoute(selectedDayNumber, itineraryItems, map)
      }
    } else {  
      if (itineraryItems.length === 0) {
        showNotification("Add 2 more items to see a route");
        return;
      }
      if (itineraryItems.length === 1) {
        showNotification("Add 1 more item to see a route");
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

    const coordinatesList = getItemCoordinateList(itineraryItems);

    console.log("Optimisation API called");
    console.log(itineraryItems)
    const query = await fetch(
      `https://api.mapbox.com/optimized-trips/v1/mapbox/walking/${coordinatesList}?geometries=geojson&roundtrip=false&source=first&destination=last&access_token=${mapboxAccessToken}`
    );
    const json = await query.json();
    // console.log(json)
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
    
    // console.log("optimise route geo: ", geometry)

    // const legs = tripsData[0].legs;
    // const legsData = legs.map((leg) => {
    //   return {
    //     distance: (leg.distance / 1000).toFixed(1),
    //     duration: leg.duration,
    //   };
    // });

    // const route = {
    //   geometry: geometry,
    //   distance: (tripsData.distance / 1000).toFixed(1), // convert distance to km
    //   duration: tripsData.duration,
    //   legs: legsData,
    //   waypointIndexValues: waypointIndexValues
    // };

    // console.log("Waypoint index values: ", waypointIndexValues)

    // Store the new route in the day object
    // updateSavedRoute(dayNumber, route);

    // addRoute(mapRef.current, geometry);

    // 1 Eiffel, 2 Chanel, 3 Louvre, 4 Notre, 5 LV
    // 1 Eiffel, 2 Notre, 3 Louvre, 4 Chanel, 5 LV
    // Waypoint index: [0, 3, 2, 1, 4]
    // Get item 0 and put it 1st
    // Get item 3 and put it 2nd
    // Get item 2 and put it 3rd
    // etc

    reorderItineraryItems(dayNumber, itineraryItems, waypointIndexValues)
  };

  const reorderItineraryItems = (dayNumber, itineraryItems, waypointIndexValues) => {
    
    // console.log("In reorderItineraryItems")
    const itineraryItemsReordered = []

    // console.log("itineraryItems")
    // console.log(itineraryItems)

    // console.log("loop")

    for (let i = 0; i < waypointIndexValues.length; i++) {
      const index = waypointIndexValues[i];
      // console.log(index);
      const item = itineraryItems[index];
      // console.log(item)
      // itineraryItemsReordered.push(itineraryItems[index]);
      itineraryItemsReordered.push(item);
      // console.log(itineraryItemsReordered)
    }
    // console.log("before setItinerary")

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

    // console.log("after setItinerary")

    // console.log(itinerary)

    // console.log("itineraryItems")
    // console.log(itineraryItems)
    // console.log("itineraryItemsReordered")
    // console.log(itineraryItemsReordered)

    // Original
    // LV, Chanel, Notre, Eiffel, Louvre

    // Optimised
    // Waypoint index: [0, 2, 3, 1, 4]
    // Expected new order: LV, Notre, Effil, Chanel, Louvre
    // Actual new order: LV, Eiffel, Chanel, Notre, Louvre
    
  }


  // Creates a list of coordinates of each item in the itineraryItems array
  // This is generated in the format of longitude,latitude;longitude,latitude
  const getItemCoordinateList = (itineraryItems) => {
    // console.log(itineraryItems)
    const itemCoordinates = itineraryItems.map((item) => [
      item.longitude,
      item.latitude,
    ]);
    return itemCoordinates.join(";");
  };

  // Creates a route on the map between each item in the the itinerary items list for 1 day
  const getRoute = async (dayNumber, itineraryItems, map) => {
    if (!map) return;

    if (itineraryItems.length < 2) return;

    let geometry = null;

    // Check if route already exists in day object
    if (itinerary[dayNumber - 1].route) {
      // console.log("TEST POINT - IF");
      geometry = itinerary[dayNumber - 1].route.geometry;
      addRoute(mapRef.current, geometry);

      // If route is null, call the API
    } else {
      // console.log("TEST POINT - ELSE");
      const coordinatesList = getItemCoordinateList(itineraryItems);

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
