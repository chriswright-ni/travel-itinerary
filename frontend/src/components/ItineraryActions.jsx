import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListMapToggle from "../components/ListMapToggle";

function ItineraryActions({handleClickAddDay, handleClickRemoveDay}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button variant="outlined" onClick={handleClickAddDay}>
        Add day
      </Button>
      <Button variant="outlined" onClick={handleClickRemoveDay}>
        Remove day
      </Button>
      <Button variant="outlined">Edit itinerary</Button>
      <Button variant="outlined">Optimise Route</Button>
      {/* <ListMapToggle /> */}
    </Box>
  );
}

export default ItineraryActions;
