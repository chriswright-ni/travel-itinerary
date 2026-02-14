import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useItineraryContext } from "../contexts/ItineraryContext";
import { useEffect, useState } from "react";
import { useNotificationContext } from "../contexts/NotificationContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function UpdateTripDateDialog({ open, onClose, tripId, date}) {

  const { updateTripDate } = useItineraryContext();

  const { showNotification } = useNotificationContext();

  const [newDate, setNewDate] = useState(dayjs(date));

  const handleUpdateTripDate = () => {
    updateTripDate(tripId, newDate)
    showNotification(`Trip date updated`);
  }

  return (
    <Box>
     
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Change Date`}
        </DialogTitle>
        <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              minDate={dayjs()} // Set min date to today
              sx={{
                borderRadius: 3,
                backgroundColor: "background.default",
                // boxShadow: 1,
                "& fieldset": {
                  border: "none",
                },
              }}
              onChange={(newValue) => setNewDate(newValue)}
              value={newDate}
              format="DD-MMM-YYYY"
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleUpdateTripDate(newDate);
              onClose();
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UpdateTripDateDialog;
