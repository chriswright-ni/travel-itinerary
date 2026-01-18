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
import {useState} from "react"
import { useNotificationContext } from "../contexts/NotificationContext";

function AuthenticationDialog() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [errorMsgEmail, setErrorMsgEmail] = useState("")
  const [errorMsgPassword, setErrorMsgPassword] = useState("")
  const [errorMsgPasswordConfirm, setErrorMsgPasswordConfirm] = useState("")

  const {
    authenticationDialogOpen,
    setAuthenticationDialogOpen,
    authenticationDialogMode,
    setAuthenticationDialogMode,
    token,
    setToken,
    setIsLoggedIn
  } = useAuthenticationContext();

  const { showNotification } = useNotificationContext();

  const handleClose = () => {
    setAuthenticationDialogOpen(false);
    setEmail("")
    setPassword("")
    setPasswordConfirm("")
  };

  const handleLogin = async () => {

    try {

      const response = await fetch(
        `http://127.0.0.1:5000/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, password})
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(`Error logging in: ${response.status}`)
        console.log(data.msg)
        setErrorMsgEmail(data.msg)
      } else {
        console.log("Log in successful")
        console.log(data)
        setErrorMsgEmail("")
        setErrorMsgPassword("")
        handleClose()
        setToken(data.access_token)
        setIsLoggedIn(true)
        
        showNotification("Login successful")
      }

    } catch (error) {
      console.log(error.message)
    }
  };

  const handleCreateAccount = async () => {

    console.log("In create account")
    console.log(`email: ${email}`)
    console.log(`password: ${password}`)
    console.log(`passwordConfirm: ${passwordConfirm}`)
    try {

      const response = await fetch(
        `http://127.0.0.1:5000/api/auth/createaccount`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, password, passwordConfirm})
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(`Error creating account: ${response.status}`)
        console.log(data.msg)
        setErrorMsgEmail(data.msg)
      } else {
        console.log("Account created")
        console.log(data)
        setErrorMsgEmail("")
        setErrorMsgPassword("")
        setAuthenticationDialogOpen(false)
        setToken(data.access_token)
        setIsLoggedIn(true)
        showNotification("Account created successfully")
      }

    } catch (error) {
      console.log(error.message)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("In handleSubmit")

    setErrorMsgEmail("")
    setErrorMsgPassword("")
    setErrorMsgPasswordConfirm("")
    
    if (!email) {
      setErrorMsgEmail("Email is required")
      return;
    }
    
    if (password.length < 8) {
      setErrorMsgPassword("Password must be at least 8 characters")
      return;
    }

    if (authenticationDialogMode === "login") {
      handleLogin();
    } else if (authenticationDialogMode === "create") {

      if (password !== passwordConfirm) {
        setErrorMsgPasswordConfirm("Passwords do not match")
        return;
      } else {
        setErrorMsgPasswordConfirm("")
      }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errorMsgEmail ? true : false}
              helperText={errorMsgEmail}
              sx={{ mb: 1 }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errorMsgPassword ? true : false}
              helperText={errorMsgPassword}
              sx={{ mb: 1 }}
            />
            {authenticationDialogMode === "create" ? (
              <TextField
                id="passwordConfirm"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                error={errorMsgPasswordConfirm ? true : false}
                helperText={errorMsgPasswordConfirm}
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
