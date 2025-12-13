import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import ItineraryItemMenu from "../components/ItineraryItemMenu";


function ItineraryItem({
  itineraryItem,
  editMode,
  handleClickRemoveFromItinerary,
  dayNumber
}) {
  return (
    <Card sx={{ maxWidth: "100%", display: "flex", mb: 2, position: "relative" }}>
      {/* <CardMedia
        component="img"
        image={"https://picsum.photos/200"}
        sx={{ width: "6rem", height: "8rem" }}
      /> */}
      <ItineraryItemMenu itineraryItemId={itineraryItem.id} dayNumber={dayNumber} handleClickRemoveFromItinerary={handleClickRemoveFromItinerary}/>
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ textAlign: "left" }}>
          <Typography
            component="div"
            sx={{ fontSize: "1rem", fontWeight: 500 }}
          >
            09:00 - 12:30
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
      </CardContent>
    </Card>
  );
}

export default ItineraryItem;
