import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { Checkbox, FormControlLabel, useMediaQuery } from '@mui/material'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'

import { AuthToken } from '../../types/AuthToken'
import axios from 'axios'
import { RegistrationDto } from '../../types/RegistrationDto'
import validator from 'validator'
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers'

import { css } from '@emotion/react';


export type RegistrationProps = {
    open: boolean
    onClose: () => void
    setAuthToken: (token: AuthToken | null) => void
}

function RegistrationDialog(props: RegistrationProps) {
    const [nameFirst, setNameFirst] = useState('')
    const [isNameFirstValid, setIsNameFirstValid] = useState(true)

    const [nameLast, setNameLast] = useState('')
    const [isNameLastValid, setIsNameLastValid] = useState(true)

    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true)

    const [password, setPassword] = useState('')
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const [dob, setDob] = useState('')
    const [isDobValid, setIsDobValid] = useState(true)

    const [isPrivacyOptInChecked, setIsPrivacyOptInChecked] = useState(false)
    const [isMarketingOptInChecked, setIsMarketingOptInChecked] = useState(false)

    const [error, setError] = useState<string>('') // added state variable for error message

    const handleNameFirstChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFirst(event.target.value)
    }

    const handleNameFirstBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value.length < 1) {
            setIsNameFirstValid(false)
        } else {
            setIsNameFirstValid(true)
            setError("")
        }
    }

    const handleNameLastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameLast(event.target.value)
    }

    const handleNameLastBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value.length < 1) {
            setIsNameLastValid(false)
        } else {
            setIsNameLastValid(true)
            setError("")
        }
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        validator.isEmail(event.target.value) ? setIsEmailValid(true) : setIsEmailValid(false)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
        if (event.target.value.length < 8) {
            setError("Password must be at least 8 characters long")
            setIsPasswordValid(false)
        } else {
            setIsPasswordValid(true)
            setError("")
        }
    }

    const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDob(event.target.value)
    }

    const handleButtonClick = (_: React.MouseEvent<HTMLButtonElement>) => {
        if (!isPrivacyOptInChecked) {
            setError("Please agree to the privacy policy")
            return
        }
        handleLogin()
    }

    const handleLogin = async () => {
        var registrationDto: RegistrationDto = {
            nameFirst: nameFirst,
            nameLast: nameLast,
            email: email,
            password: password,
            dob: dob,
            privacyOptin: isPrivacyOptInChecked,
            marketingOptin: isMarketingOptInChecked

        }
        var response = await axios.post(' https://localhost:7015/api/auth/register', registrationDto)
        if (response.status !== 200) {
            setError("Registration Error")
            console.log(response.data)
        } else {
            var authToken: AuthToken = response.data
            props.setAuthToken(authToken)
            props.onClose()
        }
    }

    const isDisabled = !(
        isNameFirstValid
        && isNameLastValid        
        && isEmailValid
        && isPasswordValid
        && isDobValid
        && isPrivacyOptInChecked)

    const registrationTooltipTitle = isDisabled ? 'All fields must be filled out to login.' : ''

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const registerButton = (
        <Button
            onClick={handleButtonClick}
            variant="contained"
            color="primary"
            disabled={isDisabled}>
            Register
        </Button>
    )

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="text"
                    value={nameFirst}
                    onChange={handleNameFirstChange}
                    onBlur={handleNameFirstBlur}
                    required
                    fullWidth
                    error={!isNameFirstValid}
                    helperText={!isNameFirstValid ? 'Please enter a valid first name' : ''} // error message
                />
                <TextField
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    value={nameLast}
                    onChange={handleNameLastChange}
                    onBlur={handleNameLastBlur}
                    required
                    fullWidth
                    error={!isNameLastValid}
                    helperText={!isNameLastValid ? 'Please enter a valid last name' : ''} // error message
                />

                {isMobile ?
                    (<MobileDatePicker
                        label="Birthdate *"
                        value={dob}
                        sx={{
                            width: '100%',
                            marginTop: "8px",
                            marginBottom: "4px"
                        }}
                    />) :
                    (<DatePicker
                        label="Birthdate *"
                        value={dob}
                        sx={{
                            width: '100%',
                            marginTop: "8px",
                            marginBottom: "4px"
                        }}
                    />)}

                <TextField
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    required
                    fullWidth
                    error={!isEmailValid} // show error if email is not valid
                    helperText={!isEmailValid ? 'Please enter a valid email address' : ''} // error message
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    fullWidth
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isPrivacyOptInChecked}
                            onChange={(e) => setIsPrivacyOptInChecked(e.target.checked)}
                        />
                    }
                    label={<>I agree to the <MuiLink component={RouterLink} to="/privacy" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                    </MuiLink></>}
                />

                <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><Checkbox /></div>}
                    label={<>Stay in the loop! By checking this box, you'll be the first to know about our latest releases and special offers.</>}
                />

                {/* <FormControlLabel
                    control={
                        <Checkbox
                            checked={isPrivacyOptInChecked}
                            onChange={(e) => setIsMarketingOptInChecked(e.target.checked)}
                        />
                    }
                    label={<>Stay in the loop! By checking this box, you'll be the first to know about our latest releases and special offers.</>}
                    sx={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
                /> */}
                {error && (
                    <Typography color="error" variant="subtitle2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Tooltip
                    title={registrationTooltipTitle}
                    placement="top"
                >
                    <span>
                        {registerButton}
                    </span>
                </Tooltip>
            </DialogActions>
        </Dialog>
    )
}

export default RegistrationDialog
