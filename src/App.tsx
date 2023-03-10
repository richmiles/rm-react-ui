import { useState } from 'react';
import {
  AppBar,
  Button,
  createTheme,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { styled, SxProps } from '@mui/system';
import LoginDialog from './Login';

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
});

const LoginButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));



function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    setOpen(true);
  };

  const handleLoginClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <AppBar position="static">
          <Toolbar>
            <Title>
              RM App
            </Title>
            <LoginButton
              color="inherit"
              onClick={handleLoginClick}
            >
              Login
            </LoginButton>
            <IconButton
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
            </Menu>
          </Toolbar>
        </AppBar>
        <LoginDialog
          open={open}
          onClose={handleLoginClose}
        ></LoginDialog>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to My App
        </Typography>
        <Typography variant="body1" align="center">
          This is my awesome app with an AppBar and a login window.
        </Typography>
      </RootContainer>
    </ThemeProvider>
  );
}

export default App;
