import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MainAppBar() {
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Itinerary
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <AccountBoxIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    // </Box>
  );
}

export default MainAppBar;
