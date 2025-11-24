import { createContext, useContext, useState } from "react";

const ItineraryContext = createContext();

export const useItineraryContext = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState([
    { dayNumber: 1, itineraryItems: [] },
  ]);

  const [nextItineraryItemId, setNextItineraryItemId] = useState(1);

  // Adds an empty day to the itinerary array
  const addDay = () => {
    const newDayNumber = itinerary.length + 1;
    const newDay = {
      dayNumber: newDayNumber,
      itineraryItems: [],
    };
    // prev is current value of the state
    setItinerary((prev) => [...prev, newDay]);
  };

  // Removes the last day from the itinerary array
  const removeDay = () => {
    const lastDayNumber = itinerary.length;
    setItinerary((prev) =>
      prev.filter((day) => day.dayNumber !== lastDayNumber)
    );
  };

  // Adds the selected item to the itinerary under day 1
  const addItemToItinerary = (place) => {
    // Create itinerary item from the place details
    const itineraryItem = {
      "id": nextItineraryItemId,
      "name": place.name,
      "recommendedDuration": 60,
    }

    setNextItineraryItemId(prev => (prev + 1))

    // Map through the current array state
    // If the day object day number is 1, create a new object
    // Add the new itinerary item to the itinerary items array and add this new object to the itinerary array
    // If the day number is not 1, copy the original day object to the itinerary array
    setItinerary((prev) => prev.map((day) =>
      day.dayNumber === 1 ? {...day, itineraryItems: [...day.itineraryItems, itineraryItem]} : day
    ));
    console.log(itineraryItem)
  };

  const value = {
    itinerary,
    setItinerary,
    addDay,
    removeDay,
    addItemToItinerary,
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};
