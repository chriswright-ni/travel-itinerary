
// DELETE THIS FILE IF ITS NOT NEEDED
// This was created to attempt to solve the problem of the map calling the API
// every time the user navigated to the map page
// This still didn't solve the issue.  For now, the map page is not part of the routes,
// it is always mounted when the app is running.

import { createContext, useContext, useState, useRef } from "react";

const MapContext = createContext()

export const useMapContext = () => useContext(MapContext)

export const MapProvider = ({children}) => {


  const value = {}

  return <MapContext.Provider value = {value}>
    {children}
  </MapContext.Provider>
}
