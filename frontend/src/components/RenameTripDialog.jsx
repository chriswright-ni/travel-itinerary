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

function RenameTripDialog({ open, onClose, tripId, tripName}) {

  const { renameTrip } = useItineraryContext();

  const { showNotification } = useNotificationContext();

  const [newTripName, setNewTripName] = useState(tripName);

  const handleRenameTrip = () => {
    renameTrip(tripId, newTripName)
    showNotification(`Trip renamed`);
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
          {`Rename Trip`}
        </DialogTitle>
        <DialogContent>
        
          <TextField
            id="standard-basic"
            value={newTripName}
            variant="outlined"
            onChange={(e) => setNewTripName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleRenameTrip(newTripName);
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

export default RenameTripDialog;
