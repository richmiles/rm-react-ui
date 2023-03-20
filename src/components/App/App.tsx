import { useEffect, useState } from 'react'
import {
  AppBar,
  createTheme,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Switch,
  ThemeProvider,
  Toolbar,
} from '@mui/material'


import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { AuthToken } from '../../types/AuthToken'
import Home from '../Home/Home'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Privacy from '../Privacy/Privacy'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ForgotPassword from '../Authentication/ForgotPassword'
import ResetPassword from '../Authentication/ResetPassword'


const color_primary = "#005f86"
const color_secondary = "#d9e7ed"
const color_link = "#005f86"
const color_white = "#fff"
const color_light = "#ddd"
const color_dark = "#333"


function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [authToken, setAuthToken] = useState<AuthToken | null>(null)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate();


  useEffect(() => {
    setForgotPasswordOpen(false)
    setResetPasswordOpen(false)

    if (location.pathname === '/forgot-password') {
      setForgotPasswordOpen(true)
    } else if (location.pathname.startsWith('/reset-password')) {
      setResetPasswordOpen(true)
    }
  }, [location.pathname])


  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: color_primary,
      },
      secondary: {
        main: color_secondary,
      },
      background: {
        default: darkMode ? color_dark : color_light,
        paper: darkMode ? color_dark : color_light
      }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: color_primary,
            color: darkMode ? color_light : color_dark
          },
        },
      },

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
            color: darkMode ? color_secondary : color_primary,
            backgroundColor: "none",
            transition: "background-color 0.3s ease",
            "&:hover": {
              color: darkMode ? color_primary : color_secondary,
            },
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: color_primary,
            color: color_white
          },
        },
      },
    },
  })

  const RootContainer = styled('div')({
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  })

  const Title = styled('h1')({
    flexGrow: 1,
    fontVariantCaps: 'small-caps',
    color: color_white
  })


  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const closeForgotPassword = () => {
    setForgotPasswordOpen(false)
    navigate('/');
  }

  const closeResetPassword = () => {
    setResetPasswordOpen(false)
    navigate('/');
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <RootContainer>
          <AppBar position="static" style={{ height: "64px" }}>
            <Toolbar>
              <img src="logo192.png"
                alt="Logo"
                style={{
                  height: "48px", // Adjust the height as needed
                  marginRight: "16px", // Add some spacing between the logo and the title
                }}
              />
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
                  <MenuItem>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={darkMode}
                          onChange={toggleDarkMode}
                          color="secondary"
                          inputProps={{ 'aria-label': 'Toggle dark mode' }}
                        />
                      }
                      label="Dark Mode"
                    />
                  </MenuItem>
                </Menu></>}
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home
              setAuthToken={setAuthToken}
            />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/forgot-password" element={<ForgotPassword open={forgotPasswordOpen} handleClose={closeForgotPassword} />} />
            <Route path="/reset-password/:token" element={<ResetPassword open={resetPasswordOpen} handleClose={closeResetPassword} />} />
          </Routes>
        </RootContainer>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
