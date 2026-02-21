import LocationSearch from "../components/LocationSearch";
import PlaceCardTopPick from "../components/PlaceCardTopPick.jsx";
import PlaceCardStandard from "../components/PlaceCardStandard.jsx";
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
import eiffelTowerImg from "../images/eiffeltower.jpg";
import louisVuittonImg from "../images/louisvuitton.jpg";
import chanelImg from "../images/chanel.jpg";
import leLouvreImg from "../images/lelouvre.jpg";
import notreDameImg from "../images/notredame.jpg";
import { useNotificationContext } from "../contexts/NotificationContext";
import MainAppBar from "../components/MainAppBar.jsx";

function SearchPage() {
  const { locationData, setLocationData } = useSearchContext();

  const {
    addItemToItinerary,
    itinerary,
    places,
    setPlaces,
    updatePlacesById,
    addDay,
    activeDay,
    setActiveDay,
    addedPlaceIds,
    currentTrip
  } = useItineraryContext();

  const { showNotification } = useNotificationContext();

  const [daySelectOpen, setDaySelectOpen] = useState(false); // Day select bottom drawer state on search page
  const [selectedPlaceId, setSelectedPlaceId] = useState(null); // Selected place for adding to itinerary
  const [selectedInterest, setSelectedInterest] = useState("");
  const days = currentTrip?.itinerary.map((day) => day.dayNumber);

  const navigate = useNavigate();

  // Temporary location data for development with location search API calling
  // const latitude = "50.0755";
  // const longitude = "14.4378";
  const latitude = "48.8584";
  const longitude = "2.2945";
  // const placesTemp = [
  //   {
  //     id: "1",
  //     name: "Eiffel Tower",
  //     category: "Landmark",
  //     distance: 400,
  //     rating: 4.8,
  //     totalRatings: 1234,
  //     // imageUrl: eiffelTowerImg,
  //     imageUrl: "https://fastly.4sqi.net/img/general/1080x1920/542336382_nmzlaxCq1QyLLwdwL_5lcTUCYDAQBLlWRAzA09-4CWs.jpg",

  //     latitude: 48.8584,
  //     longitude: 2.2945,
  //     openNow: true,
  //     description: "Iconic Paris landmark with stunning city views, restaurants, and observation decks."
  //   },
  //   {
  //     id: "2",
  //     name: "Louis Vuitton",
  //     category: "Shopping",
  //     distance: 680,
  //     rating: 4.9,
  //     totalRatings: 587,
  //     imageUrl: louisVuittonImg,
  //     latitude: 48.8700,
  //     longitude: 2.3100,
  //     openNow: false
  //   },
  //   { id: "3", name: "Le Louvre", category: "Art", distance: 1045, rating: 4.5, imageUrl: leLouvreImg, latitude: 48.8606,
  //     longitude: 2.3376 },
  //   {
  //     id: "4",
  //     name: "Notre Dame",
  //     category: "History",
  //     distance: 300,
  //     rating: 4.5,
  //     imageUrl: notreDameImg,
  //     latitude: 48.8530,
  //     longitude: 2.3499
  //   },
  //   { id: "5", name: "Chanel", category: "Shopping", distance: 378, rating: 4.6, imageUrl: chanelImg, latitude: 48.8690,
  //     longitude: 2.3230 }
  // ];

  // Temp useEffect to store temp places data for the purpose of development without making API calls
  // useEffect(() => {
  //   setPlaces(placesTemp);
  //   updatePlacesById(placesTemp);
  //   // console.log(placesTemp)
  // }, []);

  // const handleClickAddToItinerary = (place) => {
  //   addItemToItinerary(place)
  // }

  // This is called when the Add to itinerary '+' icon is selected
  // The if statement is activated if the add item button is selected from the itinerary page
  const handleClickAddToItinerary = (placeId) => {
    if (activeDay) {
      addItemToItinerary(placeId, activeDay);
      showNotification(`Item added to Day ${activeDay}`)
      setActiveDay(null);
      navigate("/itinerary");
      return;
    }
    setSelectedPlaceId(placeId);
    setDaySelectOpen(true);
  };

  // Adds item to itinerary after the day is selected from the bottom drawer
  const handleAddItemToItinerary = (dayNumber) => {
    addItemToItinerary(selectedPlaceId, dayNumber);
    showNotification(`Item added to Day ${dayNumber}`)
    setDaySelectOpen(false);
  };

  const handleClickAddDay = () => {
    const newDayNumber = addDay();
    addItemToItinerary(selectedPlaceId, newDayNumber);
    showNotification(`Item added to Day ${newDayNumber}`)
    setDaySelectOpen(false);
  };

  async function getPlaces(interest) {
    const response = await fetch(
      // `http://127.0.0.1:5000/places?interestCategory=${encodeURIComponent(interest)}&latitude=${locationData.latitude}&longitude=${locationData.longitude}`
      `http://127.0.0.1:5000/places?interestCategory=${encodeURIComponent(
        interest
      )}&latitude=${latitude}&longitude=${longitude}`
    );

    const data = await response.json(); // Array of objects
    // console.log("Inside API call");
    // console.log(data);
    setPlaces(data);
    updatePlacesById(data);
  }

  function handleInterestSelect(interest) {
    // console.log(`${interest} clicked!`);
    if (interest === selectedInterest) {
      return;
    }
    console.log(`Calling API for ${interest}`);
    setSelectedInterest(interest);
    // API call function getPlaces is commented out for UI development purposes
    getPlaces(interest);
  }

  // // This function retrives the coordinates from the user's location search selection
  async function handleLocationSelect(userSelection) {
    if (!userSelection) {
      return;
    }

    const mapbox_id = userSelection.mapbox_id;
    const response = await fetch(
      `http://127.0.0.1:5000/api/location/retrieve?id=${mapbox_id}`
    );
    const data = await response.json(); // Array of objects
    // console.log("Inside retrieve API call");
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
          bgcolor: "background.default"
        }}
      >
        <MainAppBar page={"Search"}/>
        <Box
          sx={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            zIndex: 1, // Z index is needed do prevent links used in main content showing through the background during scrolling
            px: 2,
            pt: 3,
            boxShadow: 2,
          }}
        >
          <LocationSearch onLocationSelect={handleLocationSelect} placeholderText={"Where would you like to go?"}/>
          <Box sx={{ mt: 2 }}>
            <InterestSelector
              onInterestSelect={handleInterestSelect}
              selected={selectedInterest}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1, mb: 2 }}>
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
              
              {/* <ListMapToggle /> */}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: 9, mt: 34, px: 2 }}>
          <Grid container spacing={2} direction={"column"}>
            {/* {placesTemp.map((place) => ( */}
            {places.map((place) => (
              <Grid key={place.id}>
                {/* Key to be in outer map element*/}
                {place.orderId < 4 ? (
                  <PlaceCardTopPick
                  place={place}
                  handleClickAddToItinerary={handleClickAddToItinerary}
                  isAdded={addedPlaceIds.has(place.id)}
                  isSelected={place.id === selectedPlaceId}
                  imageUrl={place.imageUrl}
                />
                ) : (
                  <PlaceCardStandard
                  place={place}
                  handleClickAddToItinerary={handleClickAddToItinerary}
                  isAdded={addedPlaceIds.has(place.id)}
                  isSelected={place.id === selectedPlaceId}
                  // imageUrl={place.imageUrl}
                />
                )}
                
              </Grid>
            ))}
          </Grid>
        </Box>
        <DaySelectDrawer
          open={daySelectOpen}
          onClose={() => {
            setSelectedPlaceId(null);
            setDaySelectOpen(false);
          }}
          itinerary={currentTrip?.itinerary}
          handleDaySelect={handleAddItemToItinerary}
          handleClickAddDay={handleClickAddDay}
          // placeId={selectedPlaceId}
        />

        <BottomNav />
      </Box>
    </>
  );
}

export default SearchPage;
