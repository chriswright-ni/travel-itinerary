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
import theme from "../themes/theme_five.js";

function ItineraryItem({
  itineraryItem,
  handleClickRemoveFromItinerary,
  dayNumber,
  handleClickMoveItem,
  handleClickChangeTime,
  ref,
  style,
  dragAttributes,
  dragListeners,
  isSelected,
  // handleMenuOpen
  setSelectedItemId

}) {
  // console.log("item: ", itineraryItem)
  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: "100%",
        display: "flex",
        mb: 2,
        position: "relative",
        borderRadius: 2,
        borderLeft: isSelected ? `4px solid ${theme.palette.primary.main}` : "none",
        bgcolor: "background.paper"
      }}
      ref={ref}
      style={style}
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
        isSelected={isSelected} 
      />
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "10%",
              cursor: "grab",
            }}
            {...dragAttributes}
            {...dragListeners}
          >
            <DragIndicatorIcon sx={{ color: "text.secondary" }} />
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
