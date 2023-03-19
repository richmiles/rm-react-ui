import { useState } from 'react';
import {
  AppBar,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  styled,
  ThemeProvider,
  Toolbar,
} from '@mui/material';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { AuthToken } from '../../types/AuthToken';
import Home from '../Home/Home';
import { Route, Routes } from 'react-router-dom';
import Privacy from '../Privacy/Privacy';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const color_primary = "#2196f3";
const color_secondary = "#f50057";

const theme = createTheme({
  palette: {
    primary: {
      main: color_primary,
    },
    secondary: {
      main: color_secondary,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small'
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: color_primary,
          backgroundColor: "none",
          transition: "background-color 0.3s ease",
          "&:hover": {
            color: color_secondary
          },
        },
      },
    },
  },
});


const RootContainer = styled('div')({
  flexGrow: 1
});

const Title = styled('h1')({
  flexGrow: 1,
  fontVariantCaps: 'small-caps'
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
