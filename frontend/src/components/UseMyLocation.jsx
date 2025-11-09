import MyLocationIcon from "@mui/icons-material/MyLocation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function UseMyLocation() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button sx={{ textTransform: "none"}} startIcon={<MyLocationIcon />} href="#text-buttons">
        Use my location
      </Button>
    </Box>
  );
}

export default UseMyLocation;
