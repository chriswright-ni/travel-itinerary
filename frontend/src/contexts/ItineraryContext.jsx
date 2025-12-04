import { createContext, useContext, useState } from "react";

const ItineraryContext = createContext();

export const useItineraryContext = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState([
    { dayNumber: 1, itineraryItems: [] },
  ]);

  const [nextItineraryItemId, setNextItineraryItemId] = useState(1); // Counter to assign itinerary ids
  const [places, setPlaces] = useState([])
  const [placesById, setPlacesById] = useState({}) // Object of places accessible by id
  const [activeDay, setActiveDay] = useState()

  // Creates an object to store places by their id
  const updatePlacesById = (places) => {
    setPlacesById(prev => {
      // console.log(prev)
      const placesCopy = {...prev}; // REMEMBER not to mutate objects in state (this avoids the issue of not triggering re-renders)
      for (const place of places) {
        // console.log(place);
        placesCopy[place.id] = place;
      }
      // console.log(placesCopy);
      return placesCopy
    });
  }

  // Adds an empty day to the itinerary array
  const addDay = () => {
    const newDayNumber = itinerary.length + 1;
    const newDay = {
      dayNumber: newDayNumber,
      itineraryItems: [],
    };
    // prev is current value of the state
    setItinerary((prev) => [...prev, newDay]);

    return newDayNumber;
  };

  // Removes the selected day from the itinerary array and renumbers the days
  const removeDay = (dayToRemove) => {
    console.log("remove day: ", dayToRemove)
    setItinerary((prev) => {
      const updatedDays = prev.filter((day) => day.dayNumber !== dayToRemove)

      const updatedDaysRenumbered = updatedDays.map((day, index) => ({
        ...day,
        dayNumber: index + 1
      }))

      return updatedDaysRenumbered
    }
    );
  };

  // Adds the selected item to the itinerary under day 1
  const addItemToItinerary = (placeId, dayNumber) => {
    
    
    const place = placesById[placeId];

    // Create itinerary item from the place details
    const itineraryItem = {
      "id": nextItineraryItemId,
      "name": place.name,
      "recommendedDuration": 60,
      "placeId": placeId
    }

    setNextItineraryItemId(prev => (prev + 1))

    // Map through the current array state
    // If the day object day number is 1, create a new object
    // Add the new itinerary item to the itinerary items array and add this new object to the itinerary array
    // If the day number is not 1, copy the original day object to the itinerary array
    setItinerary((prev) => prev.map((day) =>
      day.dayNumber === dayNumber ? {...day, itineraryItems: [...day.itineraryItems, itineraryItem]} : day
    ));
    console.log(itineraryItem)
  };

   // Removes the selected item from the itinerary
   const removeItem = (itemIdToRemove, dayNumber) => {
    setItinerary((prev) => (prev.map((day) => 
      day.dayNumber === dayNumber ? {...day, itineraryItems: [...day.itineraryItems.filter((item) => item.id !== itemIdToRemove)]} : day
    )));
   }

  const value = {
    itinerary,
    setItinerary,
    addDay,
    removeDay,
    addItemToItinerary,
    places,
    setPlaces,
    placesById,
    setPlacesById,
    updatePlacesById,
    removeItem,
    activeDay,
    setActiveDay
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};
