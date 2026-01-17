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
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useSaveItinerary from "../hooks/useSaveItinerary"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState } from "react"
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Divider from '@mui/material/Divider';
import { useAuthenticationContext } from "../contexts/AuthenticationContext";

function MainAppBar({page}) {

  const {saveItinerary} = useSaveItinerary();

  const {
    authenticationDialogOpen,
    setAuthenticationDialogOpen,
    authenticationDialogMode,
    setAuthenticationDialogMode,
    token,
    isLoggedIn
  } = useAuthenticationContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 4 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {page}
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={saveItinerary}
        >
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 0 }}
          onClick={handleClick}
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       
       { isLoggedIn ? (
         
         <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <TravelExploreIcon fontSize="small" />
          </ListItemIcon>
          My Trips
        </MenuItem>
      ) : (<MenuItem onClick={handleClose}>
        <ListItemIcon>
          <PersonAddIcon fontSize="small" />
        </ListItemIcon>
        Create Account
      </MenuItem>)}
        <Divider />
       { isLoggedIn ? (
         
         <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Log Out
        </MenuItem>
      ) : (<MenuItem onClick={handleClose}>
        <ListItemIcon>
          <LoginIcon fontSize="small" />
        </ListItemIcon>
        Log In
      </MenuItem>)}
        
      </Menu>
    </AppBar>
    
  );
}

export default MainAppBar;
