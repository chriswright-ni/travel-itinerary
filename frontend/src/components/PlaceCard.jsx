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

function PlaceCard({ place }) {
  /* Note: Place is a prop so needs destructured using {} */

  return (
    <Card sx={{ maxWidth: "100%", display: "flex"}}>
      <CardMedia
        component="img"
        image={"https://picsum.photos/200"}
        sx={{ width: "25%" }}
      />
      <CardContent sx={{flex: 1}}>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {place.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Place Description
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Add to Itinerary" size="small">
          <AddIcon fontSize="large"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PlaceCard;
