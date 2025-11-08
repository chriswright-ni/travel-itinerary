import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

function ItineraryItem() {
  return (
    <Card sx={{ maxWidth: "100%", display: "flex" }}>
      <CardMedia
        component="img"
        image={"https://picsum.photos/200"}
        sx={{ width: "25%" }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ textAlign: "left" }}>
          <Typography gutterBottom variant="h5" component="div">
            09:00 - 12:30
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Eiffel Tower
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Recommended duration: 3 hours
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Closes at 11pm
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Remove from Itinerary" size="small">
          <RemoveIcon fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ItineraryItem;
