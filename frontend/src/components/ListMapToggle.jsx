import MapIcon from '@mui/icons-material/Map';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function ListMapToggle() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button sx={{ textTransform: "none"}} startIcon={<MapIcon />} href="#text-buttons">
        Map
      </Button>
    </Box>
  );
}

export default ListMapToggle;
