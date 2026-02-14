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
import EditIcon from '@mui/icons-material/Edit';

function TripCardMenu({
  tripId,
  handleClickDeleteTrip,
  handleClickRenameTrip,
  handleClickUpdateTripDate,
 
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
          onClick={(e) => {
            e.stopPropagation();
            handleClickRenameTrip(tripId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Rename trip</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleClickUpdateTripDate(tripId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditCalendarIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change date</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleClickDeleteTrip(tripId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Remove trip</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default TripCardMenu;
