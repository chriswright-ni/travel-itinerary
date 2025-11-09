import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListMapToggle from "../components/ListMapToggle";

function ItineraryActions() {
  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Button variant="outlined">
        Add day
      </Button>
      <Button variant="outlined">
        Edit itinerary
      </Button>
      <ListMapToggle />
    </Box>
  )
}

export default ItineraryActions