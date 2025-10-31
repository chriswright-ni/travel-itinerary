import SearchBar from "../components/SearchBar";
import PlaceCard from "../components/PlaceCard";
import "../css/LandingPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function LandingPage() {
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
     
        <Grid container spacing={2}>
          <Grid size={6}>
            <PlaceCard />
          </Grid>
          <Grid size={6}>
            <PlaceCard />
          </Grid>
          <Grid size={6}>
            <PlaceCard />
          </Grid>
          <Grid size={6}>
            <PlaceCard />
          </Grid>
        </Grid>
      </Box>
     
    </>
  );
}

export default LandingPage;
