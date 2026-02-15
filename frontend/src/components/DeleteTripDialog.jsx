import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

function DeleteTripDialog({ open, onClose, tripName, handleRemoveTrip, tripId }) {
  // if (!day) return null; // This component still gets rendered, without deleting a day - day can be null in this case
  // console.log("day object in dialog: ", day)
  // console.log("day number in dialog: ", day.dayNumber)
  return (
    <Box>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Remove ${tripName} Trip?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"This trip will be permanently removed."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleRemoveTrip(tripId);
              onClose();
            }}
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DeleteTripDialog;
