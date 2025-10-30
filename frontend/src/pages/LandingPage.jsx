import SearchBar from "../components/SearchBar";
import "../css/LandingPage.css";
import Box from "@mui/material/Box";

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
      </Box>
    </>
  );
}

export default LandingPage;