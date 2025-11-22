import LocationSearch from "../components/LocationSearch";
import PlaceCard from "../components/PlaceCard";
import InterestSelector from "../components/InterestSelector";
import LocationName from "../components/LocationName";
import UseMyLocation from "../components/UseMyLocation";
import ListMapToggle from "../components/ListMapToggle";
import "../css/LandingPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BottomNav from "../components/BottomNav";
import { useSearchContext } from "../contexts/SearchContext"

function LandingPage() {

  const {locationData, setLocationData, places, setPlaces} = useSearchContext();

  async function getPlaces(interest) {
    const response = await fetch(
      `http://127.0.0.1:5000/places?interestCategory=${encodeURIComponent(interest)}&latitude=${locationData.latitude}&longitude=${locationData.longitude}`
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
    
    const mapbox_id = userSelection.mapbox_id
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
            pb: 0,
          }}
        >
          <LocationSearch onLocationSelect={handleLocationSelect}/>
          <InterestSelector onInterestSelect={handleInterestSelect} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <LocationName locationName={locationData?.name ?? "No location selected"} /> 
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <UseMyLocation />
              <ListMapToggle />
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: 8, mt: 19 }}>
          {/* Margin bottom set to 7 based on MUI bottom nav bar setup */}
          <Grid container spacing={2} direction={"Column"}>
            {places.map((place) => (
              <Grid key={place.id}>
                {" "}
                {/* Key to be in outer map element*/}
                <PlaceCard place={place} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <BottomNav />
      </Box>
    </>
  );
}

export default LandingPage;
