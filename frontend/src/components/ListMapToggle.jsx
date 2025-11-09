import MapIcon from "@mui/icons-material/Map";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function ListMapToggle() {
  return (
    <Button
      sx={{ textTransform: "none" }}
      startIcon={<MapIcon />}
      href="#text-buttons"
    >
      Map
    </Button>
  );
}

export default ListMapToggle;
