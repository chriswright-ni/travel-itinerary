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
import dayjs from "dayjs";
import TripCardMenu from "../components/TripCardMenu";
import { useItineraryContext } from "../contexts/ItineraryContext";
import TextField from "@mui/material/TextField";

function TripCard({
  tripId,
  tripName,
  locationData,
  headerImageUrl,
  clickable,
  selectTrip,
  startDate,
  dayCount,
  handleClickDeleteTrip,
  handleClickRenameTrip,
  handleClickUpdateTripDate
}) {

  

  
  return (
    <Card
        elevation={0}
        onClick={selectTrip}
        disabled={!clickable}
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
        <TripCardMenu
        tripId={tripId}
        handleClickDeleteTrip={handleClickDeleteTrip}
        handleClickRenameTrip={handleClickRenameTrip}
        handleClickUpdateTripDate={handleClickUpdateTripDate}
      />
        {/* <CardActionArea disabled={!clickable} onClick={selectTrip}> */}
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
            { startDate ? `${dayjs(startDate).format("ddd D MMM")} - ${dayjs(startDate)
                    .add(dayCount > 0 ?  dayCount - 1 : 0, "day")
                    .format("ddd D MMM")}` : null
            }
          </Typography>
        </CardContent>
        <Box sx={{ position: "absolute", zIndex: 11, top: 15, right: 15 }}>
          <Chip
            label={`${locationData?.place}, ${locationData?.country}` || locationData?.country}
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
    {/* </CardActionArea> */}
      </Card>
  );
}

export default TripCard;
