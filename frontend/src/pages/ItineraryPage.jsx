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

function ItineraryPage() {
  const { itinerary, setItinerary, addDay, removeDay } = useItineraryContext();

  const handleClickAddDay = () => {
    addDay();
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
          {itinerary.map((itineraryDay) => (
            <Accordion key={itineraryDay.dayNumber}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component="span">{`Day ${itineraryDay.dayNumber}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} direction={"column"}>
                  {itineraryDay.itineraryItems.map((itineraryItem) => (
                    <Grid key={itineraryItem.id}>
                      {/* Key to be in outer map element*/}
                      <ItineraryItem
                        itineraryItem={itineraryItem}
                      />
                      {/* <PlaceCard place={ItineraryItem} /> */}
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {/* <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
                <Typography>Day 1</Typography>
                <Typography>10.12.25</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>5 Items</Typography>
                <Typography>7 Hours</Typography>
              </Box> */}
            </AccordionSummary>
            <AccordionDetails>

            </AccordionDetails>
          </Accordion>
        </Box>
        <Box>
          <Typography>No itinerary items added yet!</Typography>
        </Box>
        <BottomNav />
      </Box>
    </>
  );
}

export default ItineraryPage;
