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

function ItineraryItemMenu({
  itineraryItemId,
  handleClickRemoveFromItinerary,
  dayNumber,
  handleClickMoveItem,
  handleClickChangeTime,
  itineraryItem
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log("item: ", itineraryItem)
  return (
    <Box>
      <IconButton
        aria-label="Card Menu"
        size="small"
        onClick={handleClick}
        sx={{ position: "absolute", right: 2, top: 5, color: "secondary.main" }}
      >
        <MoreVertIcon fontSize="large" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClickMoveItem(itineraryItemId, dayNumber);
            handleClose();
          }}
        >
          <ListItemIcon>
            <SwapHorizIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Move to another day</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClickChangeTime(
              itineraryItem,
              dayNumber,
            );
            handleClose();
          }}
        >
          <ListItemIcon>
            <ScheduleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change time</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickRemoveFromItinerary(itineraryItemId, dayNumber);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete item</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ItineraryItemMenu;
