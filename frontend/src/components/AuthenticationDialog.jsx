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

function AuthenticationDialog() {
  const {
    authenticationDialogOpen,
    setAuthenticationDialogOpen,
    authenticationDialogMode,
    setAuthenticationDialogMode,
  } = useAuthenticationContext();

  const handleClose = () => {
    setAuthenticationDialogOpen(false);
  };

  const handleLogin = () => {};

  const handleCreateAccount = () => {};

  const handleSubmit = () => {
    if (authenticationDialogMode === "login") {
      handleLogin();
    } else if (authenticationDialogMode === "create") {
      handleCreateAccount();
    } else {
      return;
    }
  };

  return (
    <Box>
      <Dialog
        open={authenticationDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {authenticationDialogMode === "login" ? "Log In" : "Create Account"}
        </DialogTitle>
        <DialogContent>
          {authenticationDialogMode === "login" ? (
            <DialogContentText
              id="alert-dialog-description"
              sx={{ mb: 2, textAlign: "center" }}
            >
              {"Log in to save your itinerary"}
            </DialogContentText>
          ) : null}
          <Box
            sx={{ display: "flex", flexDirection: "column", mb: 2, mt: 1 }}
            component="form"
            onSubmit={handleSubmit}
          >
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
              sx={{ mb: 1 }}
            />
            {authenticationDialogMode === "create" ? (
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                sx={{ mb: 1 }}
              />
            ) : null}

            <Button variant="contained" sx={{ mt: 2 }} type="submit">
              {authenticationDialogMode === "login"
                ? "Log In"
                : "Create Account"}
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {authenticationDialogMode === "login" ? (
              <Typography>Don't have an account?</Typography>
            ) : (
              <Typography>Already have an account?</Typography>
            )}

            {authenticationDialogMode === "login" ? (
              <Button
                type="text"
                sx={{ textTransform: "none", textDecoration: "underline" }}
                onClick={() => setAuthenticationDialogMode("create")}
              >
                Create account
              </Button>
            ) : (
              <Button
                type="text"
                sx={{ textTransform: "none", textDecoration: "underline" }}
                onClick={() => setAuthenticationDialogMode("login")}
              >
                Log In
              </Button>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AuthenticationDialog;
