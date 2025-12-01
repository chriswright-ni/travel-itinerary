import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function DaySelectDrawer({ open, onClose, days, handleDaySelect, handleClickAddDay }) {
  const DayList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {days.map((dayNumber) => (
          <ListItem key={dayNumber} disablePadding>
            <ListItemButton
              onClick={() => {
                handleDaySelect(dayNumber);
              }}
            >
              <ListItemText primary={`Day ${dayNumber}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItemButton
        onClick={() => {
          handleClickAddDay();
        }}
      >
        <ListItemText primary={`+ Add to a new day`} />
      </ListItemButton>
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"bottom"} open={open} onClose={onClose}>
        {DayList}
      </Drawer>
    </div>
  );
}

export default DaySelectDrawer;
