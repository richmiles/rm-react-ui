import { useState } from 'react';
import {
  AppBar,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
} from '@mui/material';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { styled } from '@mui/system';
import { AuthToken } from '../../types/AuthToken';
import Home from '../Home/Home';
import { Route, Routes } from 'react-router-dom';
import Privacy from '../Privacy/Privacy';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small'
      }
    }
  }
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
  const [authToken, setAuthToken] = useState<AuthToken | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <RootContainer>
          <AppBar position="static" style={{ height: "64px" }}>
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
          <Routes>
            <Route path="/" element={<Home setAuthToken={(token) => setAuthToken(token)} />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </RootContainer>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
