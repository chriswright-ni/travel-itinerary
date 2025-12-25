import { createContext, useContext, useState } from "react";

const MapContext = createContext()

export const useMapContext = () => useContext(MapContext)

export const MapProvider = ({children}) => {

  const value = {}

  return <MapContext.Provider value = {value}>
    {children}
  </MapContext.Provider>
}