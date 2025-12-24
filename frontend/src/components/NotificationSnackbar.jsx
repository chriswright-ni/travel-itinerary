import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import { useNotificationContext } from "../contexts/NotificationContext";

function NotificationSnackbar() {
  const { open, message, severity, autoHideDuration, showNotification, hideNotification } =
    useNotificationContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    hideNotification();
  };

  return (
    <div>  
      <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}} sx={{bottom: 65}}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default NotificationSnackbar;
