import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


function DaySelectDrawer({open, onClose, days}) {
  
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DayList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {days.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={`Day ${text}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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

export default DaySelectDrawer