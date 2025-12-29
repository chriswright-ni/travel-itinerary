import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function DistanceDurationConnector({ distance, duration }) {
  console.log("inside connector");
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography>{`${distance} km`}</Typography>
      <FiberManualRecordIcon
        sx={{
          fontSize: "0.375rem",
          mx: 1,
        }}
      />
      <Typography>{duration}</Typography>
    </Box>
  );
}

export default DistanceDurationConnector;
