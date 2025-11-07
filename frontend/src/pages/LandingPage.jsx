import SearchBar from "../components/SearchBar";
import PlaceCard from "../components/PlaceCard";
import InterestChip from "../components/InterestChip";
import InterestSelector from "../components/InterestSelector";
import LocationName from "../components/LocationName";
import "../css/LandingPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BottomNav from "../components/BottomNav";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";

function LandingPage() {
  // const [places, setPlaces] = useState([]);

  // Hard coded places for UI dev
  const places = [
    { id: 1, name: "Place 1" },
    { id: 2, name: "Place 2" },
    { id: 3, name: "Place 3" },
    { id: 4, name: "Place 4" },
    { id: 5, name: "Place 5" },
    { id: 6, name: "Place 6" },
    { id: 7, name: "Place 7" },
    { id: 8, name: "Place 8" },
    { id: 9, name: "Place 9" },
    { id: 10, name: "Place 10" },
    { id: 11, name: "Place 11" },
    { id: 12, name: "Place 12" },
  ];

  // useEffect(() => {
  //   const getPlaces = async () => {
  //     const response = await fetch("http://127.0.0.1:5000/search")
  //     const data = await response.json() // Array of objects
  //     console.log("Inside useEffect")
  //     console.log(data)
  //     setPlaces(data)
  //   }
  //   getPlaces();
  // }, [])

  async function getPlaces(interest) {
    const response = await fetch(
      `http://127.0.0.1:5000/places?interestCategory=${interest}`
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
            pb: 2
          }}
        >
          <SearchBar />
          <InterestSelector onInterestSelect={handleInterestSelect} />
          <LocationName />
        </Box>
        <Box sx={{ mb: 7, mt: 15}}>
          {/* Margin bottom set to 7 based on MUI bottom nav bar setup */}
          <Grid container spacing={2}>
            {places.map((place) => (
              <Grid size={6} key={place.id}>
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
