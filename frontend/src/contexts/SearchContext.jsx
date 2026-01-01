import { createContext, useContext, useState } from "react";


const SearchContext = createContext()

export const useSearchContext = () => useContext(SearchContext)

export const SearchProvider = ({children}) => {

  const [locationData, setLocationData] = useState(null)
  const [selectedInterest, setSelectedInterest] = useState(null)
  // const [places, setPlaces] = useState([])


  const value = {
    locationData,
    setLocationData,
    selectedInterest,
    setSelectedInterest,
    // places,
    // setPlaces
  }

  return <SearchContext.Provider value = {value}>
    {children}
  </SearchContext.Provider>
}