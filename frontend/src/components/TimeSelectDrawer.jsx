import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

function TimeSelectDrawer({ open, onClose }) {
  return (
    <div>
      <Drawer anchor={"bottom"} open={open} onClose={onClose}>
        <Typography>Change time</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Select start time" defaultValue={dayjs("2022-04-17T15:30")} />
          <DesktopTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
          
        </LocalizationProvider>
       
      </Drawer>
    </div>
  );
}

export default TimeSelectDrawer;
