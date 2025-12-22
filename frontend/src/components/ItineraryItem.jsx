import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import ItineraryItemMenu from "../components/ItineraryItemMenu";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

function ItineraryItem({
  itineraryItem,
  editMode,
  handleClickRemoveFromItinerary,
  dayNumber,
  handleClickMoveItem,
  handleClickChangeTime,
}) {
  // console.log("item: ", itineraryItem)
  return (
    <Card
      sx={{ maxWidth: "100%", display: "flex", mb: 2, position: "relative" }}
    >
      {/* <CardMedia
        component="img"
        image={"https://picsum.photos/200"}
        sx={{ width: "6rem", height: "8rem" }}
      /> */}
      <ItineraryItemMenu
        itineraryItemId={itineraryItem.id}
        dayNumber={dayNumber}
        handleClickRemoveFromItinerary={handleClickRemoveFromItinerary}
        handleClickMoveItem={handleClickMoveItem}
        handleClickChangeTime={handleClickChangeTime}
        itineraryItem={itineraryItem}
      />
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", width: "10%"}}>
            <DragIndicatorIcon />
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              component="div"
              sx={{ fontSize: "1rem", fontWeight: 500 }}
            >
              {itineraryItem.startTime} - {itineraryItem.endTime}
            </Typography>
            <Typography
              component="div"
              sx={{ fontSize: "1.125rem", fontWeight: 600 }}
            >
              {itineraryItem.name}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                fontWeight: 400,
              }}
            >
              {itineraryItem.recommendedDuration}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                fontWeight: 400,
              }}
            >
              Closes at 11pm
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ItineraryItem;
