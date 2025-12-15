import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

function DaySelectDrawer({
  open,
  onClose,
  itinerary,
  handleDaySelect,
  handleClickAddDay,
  itemId
}) {
  const DayList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2 }}>
        <Typography>Select a day</Typography>
      </Box>
      <Divider />
      <List>
        {itinerary.map((day) => {
          // console.log("item id: ", itemId)
          const itemExists = day.itineraryItems.some(
            (item) => item.id === itemId
          );
          // console.log("item exists? ", itemExists)
          return (
          <ListItem key={day.dayNumber} disablePadding>
            <ListItemButton
              onClick={() => {
                handleDaySelect(day.dayNumber);
              }}
              disabled={itemExists ? true : false}
            >
              <ListItemText primary={itemExists ? `Aleady in Day ${day.dayNumber}` : `Day ${day.dayNumber}`} />
            </ListItemButton>
          </ListItem>);
          
        })}
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
