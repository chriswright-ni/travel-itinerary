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
import AppBar from "../components/MainAppBar.jsx";
import TripCard from "../components/TripCard.jsx";

function MyTripsPage() {
  const { trips, setCurrentTrip, deleteTrip, renameTrip } = useItineraryContext();

  // console.log("Trips")
  // console.log(trips)
  const navigate = useNavigate();

  const handleSelectTrip = (trip) => {

    setCurrentTrip(trip)
    navigate("/itinerary")
  }

  const handleClickDeleteTrip = (tripId) => {

    console.log("Delete trip selected")
  }
  
  const handleClickRenameTrip = (tripId) => {
    
    console.log("Rename trip selected")
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <AppBar page={"My Trips"} />
        <Typography>My Trips</Typography>

        <Box>
          {trips.map((trip) => (
            <TripCard
              key={trip.tripId}
              tripId={trip.tripId}
              tripName={trip.tripName}
              locationData={trip.locationData}
              // headerImageUrl={trip.headerImageUrl?.image_url}
              headerImageUrl={trip.headerImageUrl}
              clickable={true}
              selectTrip={() => handleSelectTrip(trip)}
              startDate={trip.startDate}
              dayCount={trip.days}
              handleClickRenameTrip={handleClickRenameTrip}
              handleClickDeleteTrip={handleClickDeleteTrip}
            />
          ))}
        </Box>
        <BottomNav />
      </Box>
    </>
  );
}

export default MyTripsPage;
