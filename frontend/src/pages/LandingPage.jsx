import SearchBar from "../components/SearchBar";
import PlaceCard from "../components/PlaceCard";
import "../css/LandingPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BottomNav from "../components/BottomNav";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

function LandingPage() {

  // const [places, setPlaces] = useState()

  const places = [
    {id: 1, name: "Starbucks", category: "Cafe"},
    {id: 2, name: "Zios", category: "Restaurant"},
    {id: 3, name: "Costa", category: "Cafe"},
    {id: 4, name: "Bob & Berts", category: "Cafe"},
    {id: 5, name: "Mcdonalds", category: "Restaurant"},
  ]

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
        <SearchBar />
        <Button variant="text">Cafes</Button>
     
        
        <Grid container spacing={2}>
          {places.map((place) => (
            <Grid size={6} key={place.id}> {/* Key to be in outer map element*/}
            <PlaceCard place={place} />
            </Grid>
          ))}
        </Grid>
        <BottomNav />
      </Box>
     
    </>
  );
}

export default LandingPage;
