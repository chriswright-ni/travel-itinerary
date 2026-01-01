
// DELETE THIS FILE IF ITS NOT NEEDED
// This was created to attempt to solve the problem of the map calling the API
// every time the user navigated to the map page
// This still didn't solve the issue.  For now, the map page is not part of the routes,
// it is always mounted when the app is running.

import { createContext, useContext, useState, useRef } from "react";
import { useItineraryContext } from "../contexts/ItineraryContext";

const MapContext = createContext()

export const useMapContext = () => useContext(MapContext)

export const MapProvider = ({children}) => {
  const { itinerary, setItinerary, updateSavedRoute, clearSavedRoute } =
  useItineraryContext();

  const [showRoute, setShowRoute] = useState(false);

  const handleClickOptimiseRoute = (selectedDayNumber, map) => {
  
    if (itinerary[selectedDayNumber - 1].optimised) {
      // showNotification("Route already optimised")
      console.log("route already optimised")
    } else {  
      const itineraryItems = itinerary[selectedDayNumber - 1].itineraryItems;
      if (itineraryItems.length === 0) {
        // showNotification("Add 2 more items to see a route");
        return;
      }
      if (itineraryItems.length === 1) {
        // showNotification("Add 1 more item to see a route");
        return;
      }
      optimiseRoute(selectedDayNumber, itineraryItems, map)
      
    } 
    if (!showRoute) {
      setShowRoute(true)
    }
      
  };

  const value = {
    showRoute,
    setShowRoute,
    handleClickOptimiseRoute
  }

  return <MapContext.Provider value = {value}>
    {children}
  </MapContext.Provider>
}
