import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LocationPinIcon from "@mui/icons-material/LocationPin";

function LocationName() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <LocationPinIcon sx={{ mr: 1 }} />
      <Typography>Paris, France</Typography>
    </Box>
  );
}

export default LocationName;
