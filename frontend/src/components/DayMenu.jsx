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
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

function DayMenu({
  handleClickRemoveDay,
  itineraryDay,
  handleClickChangeDayTime,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  // console.log("item: ", itineraryItem)
  return (
    <Box>
      <Box
        sx={{
          typography: "button",
          cursor: "pointer",
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          color: "primary.main"
        }}
        onClick={(e) => {
          e.stopPropagation();
          console.log("day menu button clicked");
          handleClick(e)
        }}
      >
        <MoreVertIcon fontSize="large" />
      </Box>

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
            <EditCalendarIcon  fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change date</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            handleClickChangeDayTime(itineraryDay.dayNumber);
            handleClose(e);
          }}
        >
          <ListItemIcon>
            <ScheduleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change start time</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClickRemoveDay(itineraryDay.dayNumber);
            handleClose(e);
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete day</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default DayMenu;
