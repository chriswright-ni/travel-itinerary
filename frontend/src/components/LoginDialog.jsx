import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function LoginDialog({ onClose }) {
  const { loginDialogOpen, setLoginDialogOpen } =
    useAuthenticationContext();

  const handleClose = () => {
    setLoginDialogOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={loginDialogOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{mt: 2, textAlign: "center"}}>{"Log In"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ mb: 2, textAlign: "center" }}>
            {"Log in to save your itinerary"}
          </DialogContentText>
          <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <Button variant="contained">Log In</Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Don't have an account?</Typography>
            <Button
              type="text"
              sx={{ textTransform: "none", textDecoration: "underline" }}
            >
              Create account
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LoginDialog;
