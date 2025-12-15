import dayjs from "dayjs";
import { createContext, useContext, useState, useMemo } from "react";

const ItineraryContext = createContext();

export const useItineraryContext = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState([
    { dayNumber: 1, dayStartTime: "09:00", itineraryItems: [] },
  ]);

  const [nextItineraryItemId, setNextItineraryItemId] = useState(1); // Counter to assign itinerary ids
  const [places, setPlaces] = useState([]);
  const [placesById, setPlacesById] = useState({}); // Object of places accessible by id
  const [activeDay, setActiveDay] = useState(null);
  const [tripDetails, setTripDetails] = useState({
    // Setting uo the initial trip parameters
    days: 3,
    startDate: null,
    tripName: "",
  });

  // Creates a set of all placeIds that have been added to the itinerary
  const getAddedPlaceIds = () =>
    new Set(
      itinerary.flatMap((day) => day.itineraryItems.map((item) => item.placeId))
    );
  // Updates the set of addedPlaceIds when the itinerary state changes
  const addedPlaceIds = useMemo(() => getAddedPlaceIds(), [itinerary]);

  // Creates an object to store places by their id
  const updatePlacesById = (places) => {
    setPlacesById((prev) => {
      // console.log(prev)
      const placesCopy = { ...prev }; // REMEMBER not to mutate objects in state (this avoids the issue of not triggering re-renders)
      for (const place of places) {
        // console.log(place);
        placesCopy[place.id] = place;
      }
      // console.log(placesCopy);
      return placesCopy;
    });
  };

  // Adds an empty day to the itinerary array
  const addDay = () => {
    const newDayNumber = itinerary.length + 1;
    // TODO: THIS IS DUPLICATE CODE - THE INITIALISE ITINERARY FUNCTION ALSO SETS DAY START TIME AND ITEMS ARRAY
    const newDay = {
      dayNumber: newDayNumber,
      dayStartTime: "09:00",
      itineraryItems: [],
    };
    // prev is current value of the state
    setItinerary((prev) => [...prev, newDay]);

    return newDayNumber;
  };

  // Removes the selected day from the itinerary array and renumbers the days
  const removeDay = (dayToRemove) => {
    console.log("remove day: ", dayToRemove);
    setItinerary((prev) => {
      const updatedDays = prev.filter((day) => day.dayNumber !== dayToRemove);

      const updatedDaysRenumbered = updatedDays.map((day, index) => ({
        ...day,
        dayNumber: index + 1,
      }));

      return updatedDaysRenumbered;
    });
  };

  // Adds the selected item to the itinerary under day 1
  const addItemToItinerary = (placeId, dayNumber) => {
    const place = placesById[placeId];

    // Create itinerary item from the place details
    const itineraryItem = {
      id: nextItineraryItemId,
      name: place.name,
      recommendedDuration: 90,
      placeId: placeId,
      startTime: "09:05",
      endTime: "11:00",
    };

    setNextItineraryItemId((prev) => prev + 1);

    // Map through the current array state
    // If the day object day number is 1, create a new object
    // Add the new itinerary item to the itinerary items array and add this new object to the itinerary array
    // If the day number is not 1, copy the original day object to the itinerary array
    setItinerary((prev) =>
      prev.map((day) =>
        day.dayNumber === dayNumber
          ? { ...day, itineraryItems: [...day.itineraryItems, itineraryItem] }
          : day
      )
    );
    // console.log(itineraryItem);
  };

  // Removes the selected item from the itinerary
  const removeItem = (itemIdToRemove, dayNumber) => {
    setItinerary((prev) =>
      prev.map((day) =>
        day.dayNumber === dayNumber
          ? {
              ...day,
              itineraryItems: [
                ...day.itineraryItems.filter(
                  (item) => item.id !== itemIdToRemove
                ),
              ],
            }
          : day
      )
    );
  };

  // Creates a new itinerary based on the user's number of days selection
  // on the trip setup page
  // Resets the active day and next itinerary item states
  const initialiseItinerary = (days) => {
    const newItinerary = [];
    for (let i = 0; i < days; i++) {
      newItinerary.push({
        dayNumber: i + 1,
        dayStartTime: "09:00",
        itineraryItems: [],
      });
    }
    setItinerary(newItinerary);
    setActiveDay(null);
    setNextItineraryItemId(1);
    return newItinerary;
  };

  // Movies the itinerary item from the current day to the new day
  const moveItem = (itemIdToMove, currentDayNumber, newDayNumber) => {
    setItinerary((prev) => {
      // Get itinerary item from item id
      const currentDay = prev.find((day) => day.dayNumber === currentDayNumber);
      const itemToMove = currentDay.itineraryItems.find(
        (item) => item.id === itemIdToMove
      );
      if (!itemToMove) {
        return prev;
      }

      return prev.map((day) => {
        if (day.dayNumber === currentDayNumber) {
          return {
            ...day,
            itineraryItems: [
              ...day.itineraryItems.filter((item) => item.id !== itemIdToMove),
            ],
          };
        }
        if (day.dayNumber === newDayNumber) {
          return {
            ...day,
            itineraryItems: [...day.itineraryItems, itemToMove],
          };
        }
        return day;
      });
    });
  };

  // Changes the start and end time of the itinerary item, using the time selecter from the time select drawer
  const changeTime = (itemIdToChange, dayNumber, newStartTime, newEndTime) => {
    setItinerary((prev) => {
      // Get itinerary item from item id
      const itemDay = prev.find((day) => day.dayNumber === dayNumber);
      const itemToChange = itemDay.itineraryItems.find(
        (item) => item.id === itemIdToChange
      );
      if (!itemToChange) {
        return prev;
      }

      return prev.map((day) => {
        day.dayNumber === currentDayNumber
          ? {
              ...day,
              itineraryItems: day.itineraryItems.map((item) =>
                item.id === itemIdToChange
                  ? { ...item, startTime: newStartTime, endTime: newEndTime }
                  : item
              ),
            }
          : day;
      });
    });
  };

  // Takes an itinerary day and dynamically generates start and end times for each item
  // based on recommended duration and the order of the items
  // This is iniitiated using the day starting time
  // Buffer is the time between items - this will later be updated using travel times and optional pacing buffers
  const calculateItineraryTimes = (day, buffer) => {

    const startHour = Number(day.dayStartTime.split(":")[0])
    const startMin = Number(day.dayStartTime.split(":")[1])
    
    let currentTime = dayjs().hour(startHour).minute(startMin).second(0)
    // console.log("current time: ", currentTime.format("HH:mm"))
    const updatedDay = {
      ...day,
      itineraryItems: day.itineraryItems.map((item) => {
        const startTimeDynamic = currentTime
        const endTimeDynamic = startTimeDynamic.add(item.recommendedDuration, "minute")
        currentTime = endTimeDynamic.add(buffer, "minute")
        // console.log("new start time: ", startTimeDynamic)
        // console.log("new end time: ", endTimeDynamic)

        return {
          ...item,
          startTime: startTimeDynamic.format("HH:mm"),
          endTime: endTimeDynamic.format("HH:mm"),
        }
      })
    }
    return updatedDay
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
    setActiveDay,
    tripDetails,
    setTripDetails,
    initialiseItinerary,
    addedPlaceIds,
    moveItem,
    changeTime,
    calculateItineraryTimes
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};
