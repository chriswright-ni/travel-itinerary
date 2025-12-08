import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AspectRatio from "@mui/joy/AspectRatio";
import CardOverflow from "@mui/joy/CardOverflow";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlaceIcon from "@mui/icons-material/Place";

function PlaceCard({ place, handleClickAddToItinerary, isAdded }) {
  /* Note: Place is a prop so needs destructured using {} */

  return (
    <Card
      sx={{
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: 2,
        color: isAdded ? "blue" : "black"
      }}
    >
      {/* <CardMedia
        component="img"
        image={"https://picsum.photos/200"}
        sx={{ width: "25%" }}
      /> */}
      <PlaceIcon sx={{ mx: 2 }} />
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ textAlign: "left" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: "1.25rem" }}
          >
            {place.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: "1rem" }}
            >
              {place.category}
            </Typography>
            <FiberManualRecordIcon sx={{ fontSize: "0.375rem", mx: 1 }} />
            <Typography
              variant="body2"
              sx={{ color: "primary.main", fontSize: "1rem" }}
            >
              {`${place.distance}m away`}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="Add to Itinerary"
          size="small"
          onClick={() => handleClickAddToItinerary(place.id)}
        >
          <AddIcon fontSize="large" color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PlaceCard;
