import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BottomNav from "../components/BottomNav";
import ItineraryItem from "../components/ItineraryItem";
import ItineraryTitle from "../components/ItineraryTitle";
import ItineraryActions from "../components/ItineraryActions";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useItineraryContext } from "../contexts/ItineraryContext";
import Grid from "@mui/material/Grid";
import PlaceCard from "../components/PlaceCard";
import Button from "@mui/material/Button";
import { useState } from "react";

function ItineraryPage() {
  const { itinerary, setItinerary, addDay, removeDay, places, placesById } =
    useItineraryContext();
  const { editMode, setEditMode } = useState(false);

  const handleClickAddDay = () => {
    addDay();
    console.log(places); // Test code
    console.log(placesById); // Test code
  };

  const handleClickRemoveDay = () => {
    removeDay();
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
          <ItineraryActions
            handleClickAddDay={handleClickAddDay}
            handleClickRemoveDay={handleClickRemoveDay}
          />
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
                        <ItineraryItem itineraryItem={itineraryItem} />
                        {/* <PlaceCard place={ItineraryItem} /> */}
                      </Grid>
                    ))
                  )}
                </Grid>
                <Button variant="outlined" fullWidth>
                  Add Item
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <BottomNav />
      </Box>
    </>
  );
}

export default ItineraryPage;
