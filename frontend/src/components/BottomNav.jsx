import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import Paper from '@mui/material/Paper';
import {Link, useLocation} from "react-router-dom"
import NewTripConfirmationDialog from "./NewTripConfirmationDialog";
import { useItineraryContext } from "../contexts/ItineraryContext";
import { useNavigate } from "react-router-dom";

function BottomNav() {

  const [newTripConfirmationDialogOpen, setNewTripConfirmationDialogOpen] = useState(false); // State to control the new trip confirmation dialog

  const {
    hasChanges
  } = useItineraryContext();

  const location = useLocation();
  const navigate = useNavigate();

  const pathToValue = {
    "/search": "search",
    "/itinerary": "itinerary",
    "/map": "map",
    "/": "newtrip"
  }

  const value = pathToValue[location.pathname] || "search";

  const handleChange = (event, newValue) => {
    // setValue(newValue);
  };

  const handleNewTrip = () => {
    if (hasChanges) {
      setNewTripConfirmationDialogOpen(true);
    } else {
      navigate("/")
    }
  }

  const handleNewTripConfirm = () => {
    
      navigate("/")
    }
  

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        sx={{ width: "auto"}}
        value={value}
        onChange={handleChange}
      >

        {/* Note: mt: auto sticks the nav bar to the bottom of the parent flex container */}
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon />}
          component={Link}
          to='/search'
        />
        <BottomNavigationAction
          label="Itinerary"
          value="itinerary"
          icon={<FormatListBulletedIcon />}
          component={Link}
          to='/itinerary'
        />
        <BottomNavigationAction
          label="Map"
          value="map"
          icon={<LocationOnIcon />}
          component={Link}
          to='/map'
        />
        <BottomNavigationAction
          label="New Trip"
          value="newtrip"
          icon={<AddIcon />}
          onClick={handleNewTrip}
        />
      </BottomNavigation>
      <NewTripConfirmationDialog
          open={newTripConfirmationDialogOpen}
          onClose={() => setNewTripConfirmationDialogOpen(false)}
          handleNewTripConfirm={handleNewTripConfirm}
        />
    </Paper>
  );
}

export default BottomNav;
