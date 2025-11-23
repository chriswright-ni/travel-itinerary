import { createContext, useContext, useState } from "react";

const ItineraryContext = createContext();

export const useItineraryContext = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState([
    { dayNumber: 1, itineraryItems: [] },
  ]);

  // This function adds an empty day to the itinerary array
  const addDay = () => {
    const newDayNumber = itinerary.length + 1;
    const newDay = {
      dayNumber: newDayNumber,
      itineraryItems: [],
    };
    // prev is current value of the state
    setItinerary((prev) => [...prev, newDay]);
  };

  // This function removes the last day from the itinerary array
  const removeDay = () => {
    const lastDayNumber = itinerary.length;
    setItinerary((prev) =>
      prev.filter((day) => day.dayNumber !== lastDayNumber)
    );
  };

  const value = {
    itinerary,
    setItinerary,
    addDay,
    removeDay,
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};
