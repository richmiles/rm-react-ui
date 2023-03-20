import { Button, Grid } from "@mui/material"
import { useState } from "react"
import { AuthToken } from "../../types/AuthToken"
import LoginDialog from "../Login/LoginDialog"
import RegistrationDialog from "../Registration/RegistrationDialog"

type HomeProps = {
  setAuthToken: (token: AuthToken | null) => void
}

function Home(props: HomeProps) {
  const [openLogin, setOpenLogin] = useState(false)
  const [openRegistration, setOpenRegistration] = useState(false)

  const handleLoginClick = () => {
    setOpenLogin(true)
  }

  const handleLoginClose = () => {
    setOpenLogin(false)
  }

  const handleRegisterClick = () => {
    setOpenRegistration(true)
  }

  const handleRegistrationClose = () => {
    setOpenRegistration(false)
  }
  const loginButton = (
    <Button
      onClick={handleLoginClick}
      variant="contained"
      color="primary"
      style={{ margin: 10 }}>
      Login
    </Button>
  )

  const registerButton = (
    <Button
      onClick={handleRegisterClick}
      variant="contained"
      color="primary"
      style={{ margin: 10 }}>
      Register
    </Button>
  )
  return(<>
    <Grid container justifyContent="center" alignItems="center" style={{ height: "calc(100vh - 64px)", width: "100%" }} >
      {loginButton}
      {registerButton}
    </Grid>
    <LoginDialog
      open={openLogin}
      onClose={handleLoginClose}
      setAuthToken={props.setAuthToken}
    ></LoginDialog>
    <RegistrationDialog
      open={openRegistration}
      onClose={handleRegistrationClose}
      setAuthToken={props.setAuthToken}
    />
  </>)
}

export default Home