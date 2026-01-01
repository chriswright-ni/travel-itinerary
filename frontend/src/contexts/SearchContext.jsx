import { createContext, useContext, useState } from "react";


const SearchContext = createContext()

export const useSearchContext = () => useContext(SearchContext)

export const SearchProvider = ({children}) => {

  const [locationData, setLocationData] = useState(null)
  const [selectedInterest, setSelectedInterest] = useState(null)
  // const [places, setPlaces] = useState([])


  // This function retrives the coordinates from the user's location search selection
  async function handleLocationSelect(userSelection) {
    if (!userSelection) {
      return;
    }

    const mapbox_id = userSelection.mapbox_id;
    const response = await fetch(
      `http://127.0.0.1:5000/api/location/retrieve?id=${mapbox_id}`
    );
    const data = await response.json(); // Array of objects
    console.log("Inside retrieve API call");
    console.log("data: ", data)
    setLocationData(data);
    // console.log(locationData)
  }

  const value = {
    locationData,
    setLocationData,
    selectedInterest,
    setSelectedInterest,
    handleLocationSelect
    // places,
    // setPlaces
  }

  return <SearchContext.Provider value = {value}>
    {children}
  </SearchContext.Provider>
}