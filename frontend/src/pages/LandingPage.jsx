import SearchBar from "../components/SearchBar";
import PlaceCard from "../components/PlaceCard";
import InterestChip from "../components/InterestChip";
import InterestSelector from "../components/InterestSelector";
import "../css/LandingPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BottomNav from "../components/BottomNav";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

function LandingPage() {

  const [places, setPlaces] = useState([])

 
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
    const response = await fetch(`http://127.0.0.1:5000/places?interestCategory=${interest}`)
    const data = await response.json() // Array of objects
    console.log("Inside API call")
    console.log(data)
    setPlaces(data)
  }

  function handleInterestSelect(interest) {
    console.log(`${interest} clicked!`);
    console.log(`Calling API for ${interest}`);
    getPlaces(interest)
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
        <SearchBar />
        <InterestSelector onInterestSelect={handleInterestSelect}/>
        
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
