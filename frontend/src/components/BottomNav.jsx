import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function BottomNav() {
  const [value, setValue] = useState('search');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: "auto", mt: "auto"}} value={value} onChange={handleChange}> M
      {/* Note: mt: auto sticks the nav bar to the bottom of the parent flex container */}
      <BottomNavigationAction
        label="Search"
        value="search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        label="Itinerary"
        value="itinerary"
        icon={<FormatListBulletedIcon />}
      />
      <BottomNavigationAction
        label="Map"
        value="map"
        icon={<LocationOnIcon />}
      />
      
    </BottomNavigation>
  );
}

export default BottomNav;