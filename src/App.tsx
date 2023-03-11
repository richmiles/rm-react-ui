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
  Typography,
} from '@mui/material';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { styled } from '@mui/system';
import LoginDialog from './Login';
import RegisterForm from './RegisterForm';

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

const HeroImage = styled('img')({
    width: "100%",
    height: "auto",
    maxHeight: "70vh",
  });

const HeroText = styled('div')({
  padding: theme.spacing(6),
});


function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openLogin, setOpenLogin] = useState(false);

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
              <Grid container>
        <Grid item xs={12} sm={6}>
          <HeroImage
            src="https://placehold.it/600x400"
            alt="hero"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <HeroText>
            <Typography variant="h4" gutterBottom>
              Welcome to [Your Company Name]
            </Typography>
            <Typography variant="body1" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              gravida sagittis nulla at ultricies. Suspendisse ac venenatis
              elit, vel molestie justo. Suspendisse ullamcorper ipsum a
              pulvinar.
            </Typography>
            <RegisterForm />
          </HeroText>
        </Grid>
      </Grid>
        <LoginDialog
          open={openLogin}
          onClose={handleLoginClose}
        ></LoginDialog>
      </RootContainer>
    </ThemeProvider>
  );
}

export default App;
