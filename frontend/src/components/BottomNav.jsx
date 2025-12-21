import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from '@mui/material/Paper';
import {Link, useLocation} from "react-router-dom"

function BottomNav() {
  // const [value, setValue] = useState("search");

  const location = useLocation();

  const pathToValue = {
    "/search": "search",
    "/itinerary": "itinerary",
    "/map": "map"
  }

  const value = pathToValue[location.pathname] || "search";

  const handleChange = (event, newValue) => {
    // setValue(newValue);
  };

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
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
