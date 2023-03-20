import * as ApiClient from '../../services/apiClient'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import validator from 'validator'
import { ForgotPasswordDto } from '../../types/ForgotPasswordDto'

type ForgotPasswordProps = {
  open: boolean
  handleClose: () => void
}

const ForgotPassword = (props: ForgotPasswordProps) => {
  
  const { open, handleClose } = props
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [error, setError] = useState<string>('') // added state variable for error message

  const isDisabled = !isEmailValid || email.length < 1;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    validator.isEmail(event.target.value) ? setIsEmailValid(true) : setIsEmailValid(false);
  };

  const handleButtonClick = (_: React.MouseEvent<HTMLButtonElement>) => {
    handleForgotPassword();
  };

  const handleForgotPassword = async () => {
    var forgotPasswordDto: ForgotPasswordDto = {
      email: email
    }
    const success = await ApiClient.forgotPassword(forgotPasswordDto);
    if (success) {
      setIsSubmitted(true);
    } else {
      setError('Something went wrong. Please try again later.');
    }
  };

  const forgotPasswordButton = (
    <Button
      onClick={handleButtonClick}
      variant="contained"
      color="primary"
      disabled={isDisabled}>
      Submit
    </Button>
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        {!isSubmitted ? (
          <>
            <TextField
              autoFocus
              autoComplete='email'
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
              error={!isEmailValid} // show error if email is not valid                    
              helperText={!isEmailValid ? 'Please enter a valid email address' : ''} // error message
            />
          </>
        ) : (
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            If an account with that email exists, you will receive an email with a link to reset your password.
          </Typography>
        )}
        {error && (
          <Typography color="error" variant="subtitle2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        {!isSubmitted ? (<>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {forgotPasswordButton}</>
        ) : (
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ForgotPassword
