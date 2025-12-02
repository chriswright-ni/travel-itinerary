import LocationSearch from "../components/LocationSearch";
import PlaceCard from "../components/PlaceCard";
import InterestSelector from "../components/InterestSelector";
import LocationName from "../components/LocationName";
import UseMyLocation from "../components/UseMyLocation";
import ListMapToggle from "../components/ListMapToggle";
import DaySelectDrawer from "../components/DaySelectDrawer";
import "../css/LandingPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BottomNav from "../components/BottomNav";
import { useSearchContext } from "../contexts/SearchContext";
import { useItineraryContext } from "../contexts/ItineraryContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const { locationData, setLocationData} =
    useSearchContext();

  const { addItemToItinerary, itinerary, places, setPlaces, updatePlacesById, addDay, activeDay, setActiveDay } = useItineraryContext();

  const [daySelectOpen, setDaySelectOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({})
  const days = itinerary.map((day) => day.dayNumber)

  const navigate = useNavigate()

  // Temporary location data for development with location search API calling
  const latitude = "54.5973";
  const longitude = "-5.9301";
  const placesTemp = [
    {"id": 1, "name": "Eiffel Tower", "category": "Landmark", "distance": 400, "rating": 4.8},
    {"id": 2, "name": "Louis Vuitton", "category": "Shopping", "distance": 680, "rating": 4.9},
    {"id": 3, "name": "Le Louvre", "category": "Art", "distance": 1045, "rating": 4.5},
    {"id": 4, "name": "Notre Dame", "category": "History", "distance": 300, "rating": 4.5},
    {"id": 5, "name": "Chanel", "category": "Shopping", "distance": 378, "rating": 4.6},
  ]

  // Temp useEffect to store temp places data for the purpose of development without making API calls
  useEffect(() => {
    setPlaces(placesTemp);
    updatePlacesById(placesTemp);
    // console.log(placesTemp)
    
  }, [])

  // const handleClickAddToItinerary = (place) => {
  //   addItemToItinerary(place)
  // }

  const handleClickAddToItinerary = (place) => {
    if (activeDay) {
      addItemToItinerary(place, activeDay)
      setActiveDay(null)
      navigate("/itinerary")
      return;
    } 
    setSelectedPlace(place)
    setDaySelectOpen(true)
  }

  const handleDaySelect = (dayNumber) => {
    addItemToItinerary(selectedPlace, dayNumber)
    setDaySelectOpen(false)
  }

  const handleClickAddDay = () => {
    const newDayNumber = addDay();
    addItemToItinerary(selectedPlace, newDayNumber)
    setDaySelectOpen(false)
  };



  async function getPlaces(interest) {
    const response = await fetch(
      // `http://127.0.0.1:5000/places?interestCategory=${encodeURIComponent(interest)}&latitude=${locationData.latitude}&longitude=${locationData.longitude}`
      `http://127.0.0.1:5000/places?interestCategory=${encodeURIComponent(
        interest
      )}&latitude=${latitude}&longitude=${longitude}`
    );

    const data = await response.json(); // Array of objects
    console.log("Inside API call");
    console.log(data);
    setPlaces(data);
  }

  function handleInterestSelect(interest) {
    console.log(`${interest} clicked!`);
    console.log(`Calling API for ${interest}`);
    getPlaces(interest);
  }

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
    setLocationData(data);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            zIndex: 1, // Z index is needed do prevent links used in main content showing through the background during scrolling
            px: 2,
            py: 1,
            boxShadow: 2
          }}
        >
          <LocationSearch onLocationSelect={handleLocationSelect} />
          <Box sx={{ mt: 1 }}>
            <InterestSelector onInterestSelect={handleInterestSelect} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
            <LocationName
              locationName={locationData?.name ?? "No location selected"}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <UseMyLocation />
              {/* <ListMapToggle /> */}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: 9, mt: 26, px: 2 }}>
          <Grid container spacing={2} direction={"column"}>
            {placesTemp.map((place) => (
              <Grid key={place.id}>
                {/* Key to be in outer map element*/}
                <PlaceCard place={place} handleClickAddToItinerary={handleClickAddToItinerary} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <DaySelectDrawer open={daySelectOpen} onClose={() => setDaySelectOpen(false)} days={days} handleDaySelect={handleDaySelect} handleClickAddDay={handleClickAddDay}/>

        <BottomNav />
      </Box>
    </>
  );
}


export default LandingPage;
