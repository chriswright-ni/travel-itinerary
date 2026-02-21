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
import CheckIcon from "@mui/icons-material/Check";
import theme from "../themes/theme_five.js";
import Chip from "@mui/material/Chip";
import StarIcon from '@mui/icons-material/Star';

function PlaceCardTopPick({
  place,
  handleClickAddToItinerary,
  isAdded,
  isSelected,
  imageUrl,
}) {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        // display: "flex",
        alignItems: "center",
        borderRadius: 2,
        boxShadow: "0px 6px 20px rgba(255, 138, 92, 0.18)",
        // boxShadow:
        //   isSelected && !isAdded
        //     ? `0 0 8px 2px ${theme.palette.primary.main}`
        //     : "2",
        bgcolor: isAdded ? "background.secondary" : "background.paper",
        // height: "100px"
      }}
    >
      {/* <CardMedia
        component="img"
        image={"https://picsum.photos/200"}
        sx={{ width: "25%" }}
      /> */}
      <CardMedia
        component="img"
        image={imageUrl}
        // sx={{ width: "20%", height: "100%", objectFit: "cover" }}
        // sx={{ height: 160, objectFit: "cover" }}
        sx={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
      />
      {/* <PlaceIcon sx={{ mx: 2 }} /> */}
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: "1.25rem", textAlign: "left" }}
            >
              {place.name}
            </Typography>
            <Box sx={{display: "flex", alignItems: "center", gap: 0.25}}>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontSize: "1.15rem" }}
              >
                {place.rating}
              </Typography>
              <StarIcon sx={{color: "#FFD700"}}/>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "text.secondary", fontSize: "0.875rem" }}
              >
                ({place.totalRatings})
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
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
                sx={{
                  color: isAdded ? "text.secondary" : "primary.main",
                  fontSize: "1rem",
                }}
              >
                {`${place.distance}m away`}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              {place.openNow ? (
                <Chip
                  label="Open Now"
                  color="success"
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              ) : (
                <Chip
                  label="Closed"
                  variant="filled"
                  sx={{
                    fontWeight: 600,
                    bgcolor: theme.palette.text.disabled,
                    color: "#ffffff",
                  }}
                />
              )}
            </Box>
          </Box>
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            {place.description}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", mb: 2 }}>
        <Button
          variant="outlined"
          disabled={isAdded}
          startIcon={isAdded ? <CheckIcon /> : <AddIcon />}
          onClick={() => handleClickAddToItinerary(place.id)}
          sx={{ borderRadius: "20px" }}
        >
          {isAdded ? "Added" : "Add to Itinerary"}
        </Button>

       
      </CardActions>
    </Card>
  );
}

export default PlaceCardTopPick;
