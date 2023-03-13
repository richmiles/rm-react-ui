import { useState } from 'react';
import {
  AppBar,
  Button,
  createTheme,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
} from '@mui/material';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { styled } from '@mui/system';
import LoginDialog from '../Login/LoginDialog';
import RegistrationDialog from '../Registration/RegistrationDialog';
import { AuthToken } from '../../types/AuthToken';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const RootContainer = styled('div')({
  flexGrow: 1,
});

const Title = styled('h1')({
  flexGrow: 1,
  fontVariantCaps: 'small-caps',
});


function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);
  const [authToken, setAuthToken] = useState<AuthToken | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    setOpenLogin(true);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const handleRegisterClick = () => {
    setOpenRegistration(true);
  };

  const handleRegistrationClose = () => {
    setOpenRegistration(false);
  };

  const loginButton = (
    <Button
        onClick={handleLoginClick}
        variant="contained"       
        color="primary" 
        style={{margin: 10}}>
        Login
    </Button>
  );
  
  const registerButton = (
    <Button
        onClick={handleRegisterClick}
        variant="contained"
        color="primary"
        style={{margin: 10}}>
        Register
    </Button>
  );

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <AppBar position="static" style={{height: "64px"}}>
          <Toolbar>
            <Title>
              RM App
            </Title>
            {authToken != null && <><IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuClick}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu></>}
          </Toolbar>
        </AppBar>
        <Grid container justifyContent="center" alignItems="center" style={{height: "calc(100vh - 64px)", width: "100%"}} >
            {loginButton}
            {registerButton}
        </Grid>
        <LoginDialog
          open={openLogin}
          onClose={handleLoginClose}
          setAuthToken={setAuthToken}
        ></LoginDialog>
        <RegistrationDialog
          open={openRegistration}
          onClose={handleRegistrationClose}
          setAuthToken={setAuthToken}
        />
      </RootContainer>
    </ThemeProvider>
  );
}

export default App;
