import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BottomNav from "../components/BottomNav";
import ItineraryItem from "../components/ItineraryItem";
import ItineraryTitle from "../components/ItineraryTitle";
// import ItineraryActions from "../components/ItineraryActions";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useItineraryContext } from "../contexts/ItineraryContext";
import Grid from "@mui/material/Grid";
import PlaceCard from "../components/PlaceCard";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import AccordionActions from "@mui/material/AccordionActions";

function ItineraryPage() {
  const { itinerary, setItinerary, addDay, removeDay, places, placesById, removeItem } =
    useItineraryContext();
  const [ editMode, setEditMode ] = useState(false);

  useEffect(() => {
    console.log("Itinerary update: ", itinerary)
  }, [itinerary])

  const handleClickAddDay = () => {
    addDay();
    console.log(places); // Test code
    console.log(placesById); // Test code
  };

  const handleClickRemoveDay = (dayToRemove) => {
    removeDay(dayToRemove);
  };

  const handleClickRemoveFromItinerary = (itemIdToRemove, dayNumber) => {
    removeItem(itemIdToRemove, dayNumber);
  };

  // Toggles the itinerary edit mode
  // In edit mode, the add day, remove day and remove item become visible
  const handleClickEditItinerary = () => {
    setEditMode(prev => !prev)
    console.log(`edit mode: ${editMode}`)
  };

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
        <Box>
          <ItineraryTitle />

          <Button variant="outlined" onClick={handleClickEditItinerary}>{editMode ? "Done" : "Edit itinerary"}</Button>
          <Button variant="outlined">Optimise Route</Button>
        </Box>
        <Box>
          {itinerary.map((itineraryDay, index) => (
            <Accordion
              key={itineraryDay.dayNumber}
              defaultExpanded={index === 0 ? true : false}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component="span">{`Day ${itineraryDay.dayNumber}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} direction={"column"}>
                  {itineraryDay.itineraryItems.length === 0 ? (
                    <Box>
                      <Typography>No itinerary items added yet!</Typography>
                    </Box>
                  ) : (
                    itineraryDay.itineraryItems.map((itineraryItem) => (
                      <Grid key={itineraryItem.id}>
                        {/* Key to be in outer map element*/}
                        <ItineraryItem itineraryItem={itineraryItem} editMode={editMode} handleClickRemoveFromItinerary={() => handleClickRemoveFromItinerary(itineraryItem.id, itineraryDay.dayNumber)} />
                        {/* <PlaceCard place={ItineraryItem} /> */}
                      </Grid>
                    ))
                  )}
                </Grid>
                <Button variant="outlined" fullWidth>
                  Add Item
                </Button>
              </AccordionDetails>
              <AccordionActions>
                {editMode ? 
                <Button
                variant="outlined"
                fullWidth
                onClick={() => handleClickRemoveDay(itineraryDay.dayNumber)}
                >Remove Day
                </Button>
              : ""}
              </AccordionActions>
            </Accordion>
          ))}
        </Box>
        <Box>
          {editMode ? 
          <Button variant="outlined" fullWidth onClick={handleClickAddDay}>
            Add day
          </Button>
          : ""}
        </Box>
        <BottomNav />
      </Box>
    </>
  );
}

export default ItineraryPage;
