import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

function TripCardMenu({
  tripId,
  handleClickDeleteTrip,
  handleClickRenameTrip,
 
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };
  // console.log("item: ", itineraryItem)
  return (
    <Box>
      <IconButton
        aria-label="Card Menu"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
        sx={{ position: "absolute", right: 2, bottom: 5, color: "primary.main", zIndex: 11 }}
      >
        <MoreVertIcon fontSize="large" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          handleClose();
        }}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClickRenameTrip(tripId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <SwapHorizIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Rename Trip</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClickDeleteTrip(tripId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Trip</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default TripCardMenu;
