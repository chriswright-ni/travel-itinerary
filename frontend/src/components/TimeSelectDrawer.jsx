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
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

function TimeSelectDrawer({
  open,
  onClose,
  currentStartTime,
  currentEndTime,
  handleClickSetTime,
}) {
  // const [startTime, setStartTime] = useState(dayjs(currentStartTime, 'HH:mm'))
  // const [startTime, setStartTime] = useState(dayjs("09:10", "HH:mm"));
  // const [startTime, setStartTime] = useState(null)
  const [startTime, setStartTime] = useState(
    dayjs().hour(0).minute(0).second(0)
  );

  console.log("current start time: ", currentStartTime);
  // This useEffect updates the startTime whenever the drawer is opened
  // This prevents errors on the 1st render of the drawer
  // It occurs only when the currentStartTime is defined
  useEffect(() => {
    if (currentStartTime) {
      const startHour = Number(currentStartTime.split(":")[0]);
      const startMin = Number(currentStartTime.split(":")[1]);
      setStartTime(dayjs().hour(startHour).minute(startMin).second(0));
    }
  }, [open]);

  // console.log("current start time in time select drawer: ", currentStartTime);
  // console.log("start time state in time select drawer: ", startTime);
  // console.log("start time state: ", startTime)

  // const startHour = currentStartTime ? currentStartTime.split(":")[0] : 0;
  // const startMin = currentStartTime ? currentStartTime.split(":")[1] : 0;
  // const startMin = currentStartTime.split(":")[1];
  // const [startTimeH, setStartTimeH] = useState(null)
  // const [startTimeM, setStartTimeM] = useState(null)

  return (
    <div>
      <Drawer
        anchor={"bottom"}
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: {
            style: { opacity: 0.1 },
          },
        }}
      >
        <Typography>Change time</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Select start time"
            // value={dayjs("00:00", "HH:mm")}
            // value={dayjs().hour(0).minute(0).second(0)}
            // value={dayjs().hour(startTimeH).minute(startTimeM).second(0)}
            // value={dayjs("09:55", "HH:mm")}
            value={startTime}
            onChange={(newStartTime) => setStartTime(newStartTime)}
          />

          {/* <TimePicker label="Select end time" defaultValue={currentEndTime} /> */}
          {/* <DesktopTimePicker defaultValue={dayjs("2022-04-17T15:30")} /> */}
        </LocalizationProvider>
        <Divider />
        <Button
          onClick={() => {
            handleClickSetTime(startTime);
            onClose();
          }}
        >
          Set time
        </Button>
      </Drawer>
    </div>
  );
}

export default TimeSelectDrawer;
