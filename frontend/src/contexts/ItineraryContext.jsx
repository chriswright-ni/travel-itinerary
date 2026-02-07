import dayjs from "dayjs";
import { createContext, useContext, useState, useMemo } from "react";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { useNotificationContext } from "../contexts/NotificationContext";

const ItineraryContext = createContext();

export const useItineraryContext = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  // DAY START LOCATION ADDED BELOW FOR THE PURPOSE OF DEVELOPMENT WITHOUT CALLING API
  // const [itinerary, setItinerary] = useState([
  //   { dayNumber: 1, dayStartTime: "09:00", dayStartLocation: {name: "Rue De Lille, 75007 Paris, France", longitude: 2.325855, latitude: 48.859656}, itineraryItems: [] },
  // ]); // This state is now obsolete - see setItinerary function below

  const { token } = useAuthenticationContext();
  const { showNotification } = useNotificationContext();

  const [nextItineraryItemId, setNextItineraryItemId] = useState(1); // Counter to assign itinerary ids
  const [places, setPlaces] = useState([]);
  const [placesById, setPlacesById] = useState({}); // Object of places accessible by id
  const [activeDay, setActiveDay] = useState(null);
  const [tripDetails, setTripDetails] = useState({
    // Setting up the initial trip parameters
    days: 3,
    startDate: null,
    tripName: "",
  }); // This state is now obsolete
  const [currentTrip, setCurrentTrip] = useState({
    tripId: crypto.randomUUID(),
    days: 3,
    startDate: null,
    tripName: "",
    headerImageUrl: null,
    itinerary: [],
  });
  const [trips, setTrips] = useState([]);
  const [expanded, setExpanded] = useState(1); // Management of accordion day expanded status - default to day 1 expanded on 1st render

  const saveCurrentTrip = async () => {
    console.log("Saving current trip...");
    setTrips((prev) => {
      const tripExists = prev.some(
        (trip) => trip.tripId === currentTrip.tripId
      );

      if (tripExists) {
        return prev.map((trip) =>
          trip.tripId === currentTrip.tripId ? currentTrip : trip
        );
      } else {
        return [...prev, currentTrip];
      }
    });

    try {
    
      const response = await fetch(`http://127.0.0.1:5000/api/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(currentTrip),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(`Error logging in: ${response.status}`);
        console.log(data.msg);
      } else {
        console.log("Trip saved");
        console.log(data);
        showNotification("Trip Saved");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchTrips = async (token) => {

    try {
   
      const response = await fetch(`http://127.0.0.1:5000/api/trips`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("Trip data when received from backend:")
      console.log(data)
      if (!response.ok) {
        console.log(`Error logging in: ${response.status}`);
        console.log(data.msg);
      } else {
        // console.log("Trips loaded");
        // console.log(data);
        setTrips(formatTrips(data.trips))
        // setCurrentTrip(formatTrips(data.trips)[0])

      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatTrips = (tripData) => {

    // console.log("In formatTrips")
    // console.log(tripData)
    const formattedTrips = tripData.map((trip) => ({
      tripId: trip.trip_id,
      tripName: trip.trip_name,
      headerImageUrl: trip.trip_image_url,
      startDate: trip.start_date,
      days: trip.days.length,
      itinerary: trip.days.map((day) => ({
        dayNumber: day.day_number,
        dayStartTime: day.start_time,
        itineraryItems: day.itinerary_items.map((item) => (
          {
            id: item.itinerary_item_id,
            name: item.place_name,
            startTime: item.start_time,
            endTime: item.end_time,
            recommendedDuration: item.place_recommended_duration,
          }
        ))
      })),
      locationData: {
        country: trip.location_data.country_name,
        countryCode: trip.location_data.country_code,
        place: trip.location_data.city_name,
      }


    }))
    console.log("formatted trips:")
    console.log(formattedTrips)
    return formattedTrips
  }


  // const loadTrip = (tripId) => {
  //   const trip = trips.find((trip) => trip.tripId === tripId);
  //   setCurrentTrip(trip)
  // }

  // This function works the same way as the obsolete setItinerary state function
  // The itinerary is updated within the currentTrip object
  const setItinerary = (updaterFunction) => {
    setCurrentTrip((prev) => ({
      ...prev,
      itinerary: updaterFunction(prev.itinerary),
    }));
  };

  // Creates a set of all placeIds that have been added to the itinerary
  const getAddedPlaceIds = () => {
    // console.log("In getAddedPlaceIds")
    return new Set(
      currentTrip?.itinerary.flatMap((day) =>
        day.itineraryItems.map((item) => item.placeId)
      )
    );
  };
  // Updates the set of addedPlaceIds when the itinerary state changes
  const addedPlaceIds = useMemo(
    () => getAddedPlaceIds(),
    [currentTrip?.itinerary]
  );

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
    const newDayNumber = currentTrip.itinerary.length + 1;
    // TODO: THIS IS DUPLICATE CODE - THE INITIALISE ITINERARY FUNCTION ALSO SETS DAY START TIME AND ITEMS ARRAY
    const newDay = {
      dayNumber: newDayNumber,
      dayStartTime: "09:00",
      dayStartLocation: null,
      itineraryItems: [],
    };
    // prev is current value of the state
    setItinerary((prev) => [...prev, newDay]);

    // console.log("Current trip structure:")
    // console.log(currentTrip)
    // console.log("Location data structure:")
    // console.log(currentTrip.locationData)
    console.log("Itinerary structure:")
    console.log(currentTrip.itinerary)

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
      latitude: place.latitude,
      longitude: place.longitude,
    };

    setNextItineraryItemId((prev) => prev + 1);

    // Map through the current array state
    // If the day object day number is 1, create a new object
    // Add the new itinerary item to the itinerary items array and add this new object to the itinerary array
    // If the day number is not 1, copy the original day object to the itinerary array
    setItinerary((prev) =>
      prev.map((day) =>
        day.dayNumber === dayNumber
          ? {
              ...day,
              itineraryItems: [...day.itineraryItems, itineraryItem],
              route: null,
              optimised: false,
            }
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
              route: null,
              optimised: false,
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
        dayStartLocation: null,
        itineraryItems: [],
      });
    }
    // setItinerary(newItinerary);
    // setActiveDay(null);
    // setNextItineraryItemId(1);
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
            route: null,
            optimised: false,
          };
        }
        if (day.dayNumber === newDayNumber) {
          return {
            ...day,
            itineraryItems: [...day.itineraryItems, itemToMove],
            route: null,
            optimised: false,
          };
        }
        return day;
      });
    });
  };

  // Changes the start and end time of the itinerary item, using the time selecter from the time select drawer
  // THIS FUNCTION NEEDS UPDATED - IT NO LONGER WORKS AFTER THE AUTOMATIC TIME CALCULATOR FUNCTION WAS ADDED
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
    const startHour = Number(day.dayStartTime?.split(":")[0]);
    const startMin = Number(day.dayStartTime?.split(":")[1]);

    let currentTime = dayjs().hour(startHour).minute(startMin).second(0);
    // console.log("current time: ", currentTime.format("HH:mm"))
    const updatedDay = {
      ...day,
      itineraryItems: day.itineraryItems.map((item) => {
        const startTimeDynamic = currentTime;
        const endTimeDynamic = startTimeDynamic.add(
          item.recommendedDuration,
          "minute"
        );
        currentTime = endTimeDynamic.add(buffer, "minute");
        // console.log("new start time: ", startTimeDynamic)
        // console.log("new end time: ", endTimeDynamic)

        return {
          ...item,
          startTime: startTimeDynamic.format("HH:mm"),
          endTime: endTimeDynamic.format("HH:mm"),
        };
      }),
    };
    return updatedDay;
  };

  const updateDayStartTime = (dayNumber, dayStartTime) => {
    setItinerary((prev) => {
      if (!dayStartTime) {
        return prev;
      }

      return prev.map((day) =>
        day.dayNumber === dayNumber
          ? {
              ...day,
              dayStartTime: dayStartTime.format("HH:mm"),
            }
          : day
      );
    });
  };

  // Save the route in the itinerary day object
  const updateSavedRoute = (dayNumber, route) => {
    setItinerary((prev) => {
      if (!dayNumber) {
        return prev;
      }
      if (!route) {
        return prev;
      }

      return prev.map((day) =>
        day.dayNumber === dayNumber
          ? {
              ...day,
              route: route,
            }
          : day
      );
    });
  };

  // Sets route object to null
  const clearSavedRoute = (dayNumber) => {
    setItinerary((prev) => {
      if (!dayNumber) {
        return prev;
      }

      return prev.map((day) =>
        day.dayNumber === dayNumber
          ? {
              ...day,
              route: null,
            }
          : day
      );
    });
  };

  const updateDayStartLocation = (dayNumber, locationData) => {
    console.log("in update day start location");
    if (!dayNumber) return;
    if (!locationData) return;

    setItinerary((prev) =>
      prev.map((day) =>
        day.dayNumber === dayNumber
          ? {
              ...day,
              dayStartLocation: {
                name: locationData.name,
                longitude: locationData.longitude,
                latitude: locationData.latitude,
              },
            }
          : day
      )
    );
  };

  const value = {
    // itinerary,
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
    calculateItineraryTimes,
    updateDayStartTime,
    expanded,
    setExpanded,
    updateSavedRoute,
    clearSavedRoute,
    updateDayStartLocation,
    currentTrip,
    setCurrentTrip,
    saveCurrentTrip,
    // loadTrip,
    trips,
    setTrips,
    fetchTrips
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};
