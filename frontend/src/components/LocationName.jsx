import Typography from "@mui/material/Typography";
import LocationPinIcon from "@mui/icons-material/LocationPin";

function LocationName() {
  return (
    <Typography sx={{ display: "flex", alignItems: "center"}}>
      <LocationPinIcon sx={{mr: 1}} />
      Paris, France
    </Typography>
  );
}

export default LocationName;
