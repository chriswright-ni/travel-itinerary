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
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function TripSetupPage() {
  const [days, setDays] = useState(3);
  const [date, setDate] = useState(dayjs());
  const [tripName, setTripName] = useState("");

  const minDays = 1;
  const maxDays = 21;

  const { locationData, setLocationData } = useSearchContext();

  const { setTripDetails, initialiseItinerary, itinerary } = useItineraryContext();

  const navigate = useNavigate()

  // This function retrives the coordinates from the user's location search selection
  const handleLocationSelect = async (userSelection) => {
    if (!userSelection) {
      return;
    }

    const mapbox_id = userSelection.mapbox_id;
    const response = await fetch(
      `http://127.0.0.1:5000/api/location/retrieve?id=${mapbox_id}`
    );
    const data = await response.json(); // Array of objects
    console.log("Inside retrieve API call");
    console.log(data)
    setLocationData(data);
  }

  const handleClickAddDay = () => {
    setDays((prev) => prev + 1);
  };

  const handleClickRemoveDay = () => {
    setDays((prev) => prev - 1);
  };

  const getHeaderImageUrl = async (country, place) => {

    const query = encodeURIComponent(place ? place : country)

    const response = await fetch(
      `http://127.0.0.1:5000/api/images/search?query=${query}`
    );
    const imageUrl = await response.json();
    console.log(imageUrl)
    return imageUrl
  }

  const handleClickTripSetup = async () => {
    
    let headerImageUrl = null;

    // ADD VALIDATION IF REQUIRED - i.e. if the user hasn't made any selections
    if (locationData) {
      headerImageUrl = await getHeaderImageUrl(locationData.country, locationData.place);
    }

    console.log("header image:")
    console.log(headerImageUrl)

    setTripDetails({
      days: days,
      startDate: date,
      tripName: tripName,
      headerImageUrl: headerImageUrl
    });
    console.log("days ", days)

    const newItem = initialiseItinerary(days)
    console.log("test ", newItem)

    navigate("/itinerary")

  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "100vh",
          px: 2,
          py: 2,
          gap: 3,
        }}
      >
        <Typography>Let's set your trip up!</Typography>

        <LocationSearch onLocationSelect={handleLocationSelect} />
        <UseMyLocation />

        <Typography>How many days?</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <IconButton
            aria-label="Remove day"
            size="small"
            onClick={() => handleClickRemoveDay()}
            disabled={days === minDays ? true : false}
            sx={{
              "& svg": {
                color: days === minDays ? "primary.disabled" : "primary.main",
              },
            }}
          >
            <RemoveIcon
              fontSize="large"
              color={days === minDays ? "primary.disabled" : "primary.main"}
            />
          </IconButton>
          <Typography variant="h6">
            {days} {days > 1 ? "Days" : "Day"}
          </Typography>
          <IconButton
            aria-label="Add day"
            size="small"
            onClick={() => handleClickAddDay()}
            disabled={days === maxDays ? true : false}
            sx={{
              "& svg": {
                color: days === maxDays ? "primary.disabled" : "primary.main",
              },
            }}
          >
            <AddIcon fontSize="large" color="primary" />
          </IconButton>
        </Box>
        <Typography>When is your trip starting?</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            minDate={dayjs()} // Set min date to today
            sx={{
              borderRadius: 3,
              backgroundColor: "background.default",
              // boxShadow: 1,
              "& fieldset": {
                border: "none",
              },
            }}
            onChange={(newValue) => setDate(newValue)}
            value={date}
          />
        </LocalizationProvider>

        <TextField
          id="standard-basic"
          label="What is your trip called?"
          variant="outlined"
          onChange={(e) => setTripName(e.target.value)}
        />

        <Button variant="outlined" onClick={handleClickTripSetup}>
          Start Planning!
        </Button>
      </Box>
    </>
  );
}

export default TripSetupPage;
