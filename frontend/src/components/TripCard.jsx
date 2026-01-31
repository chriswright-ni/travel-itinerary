import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Flag from "react-world-flags";
import headerPlaceholder from "../images/unsplash-travel-placeholder.jpg";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";

function TripCard({ tripName, locationData, headerImageUrl, clickable, selectTrip }) {
  return (
    
    <CardActionArea disabled={!clickable} onClick={selectTrip}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          mx: 2,
          mt: 3,
          mb: 3,
          bgcolor: "background.paper",
          position: "relative",
          boxShadow: "0px 8px 24px rgba(255, 138, 92, 0.2)",
        }}
      >
        <CardMedia
          sx={{
            height: 200,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            zIndex: 1,
          }}
          image={headerImageUrl || headerPlaceholder}
          title={locationData?.place}
        />
        <CardContent
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
            zIndex: 10,
            bgcolor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 2,
            py: 0.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#ffffff",
              textAlign: "left",
              fontSize: "1.75rem",
            }}
          >
            {tripName || locationData?.place || "My Trip"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#ffffff", textAlign: "left", fontSize: "1rem" }}
          >
            Mon 15 Jan - Fri 19 Jan
          </Typography>
        </CardContent>
        <Box sx={{ position: "absolute", zIndex: 11, top: 15, right: 15 }}>
          <Chip
            label={locationData?.place || locationData?.country}
            icon={
              <Flag code={locationData?.country_code || "GB"} height={14} />
            }
            sx={{
              color: "#ffffff",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              fontSize: "1rem",
              px: 1,
            }}
          />
        </Box>
      </Card>
    </CardActionArea>
  );
}

export default TripCard;
