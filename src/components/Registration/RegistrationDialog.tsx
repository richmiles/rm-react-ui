import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { AuthToken } from '../../types/AuthToken';
import axios from 'axios';
import { RegistrationDto } from '../../types/RegistrationDto';
import validator from 'validator';

export type RegistrationProps = {
    open: boolean;
    onClose: () => void;
    setAuthToken: (token: AuthToken | null) => void;
}

function RegistrationDialog(props: RegistrationProps) {
    const [nameFirst, setNameFirst] = useState('');
    const [isNameFirstValid, setIsNameFirstValid] = useState(true);
    const [nameLast, setNameLast] = useState('');
    const [isNameLastValid, setIsNameLastValid] = useState(true);
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState<string>(''); // added state variable for error message

    const handleNameFirstChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 1) {
            setError("First name must be at least 1 character long")
        } else {
            setNameFirst(event.target.value);
        }
    };

    const handleNameLastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 1) {
            setError("Last name must be at least 1 character long")
        } else {
            setNameLast(event.target.value);
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        validator.isEmail(event.target.value) ? setIsEmailValid(true) : setIsEmailValid(false);

    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        if (event.target.value.length < 8) {
            setError("Password must be at least 8 characters long")
        } else {
            setError("")
        }
    };

    const handleButtonClick = (_: React.MouseEvent<HTMLButtonElement>) => {
        handleLogin();
    };

    const handleLogin = async () => {
        var registrationDto: RegistrationDto = {
            nameFirst: nameFirst,
            nameLast: nameLast,
            email: email,
            password: password,
            dob: dob
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
    };

    const isDisabled = !(email && password && isEmailValid);
    const registrationTooltipTitle = isDisabled ? 'All fields must be filled out to login.' : '';

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const registerButton = (
        <Button
            onClick={handleButtonClick}
            variant="contained"
            color="primary"
            disabled={isDisabled}>
            Register
        </Button>
    );

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="text"
                    value={nameFirst}
                    onChange={handleNameFirstChange}
                    required
                    fullWidth
                    error={!isNameFirstValid}
                    helperText={!isNameFirstValid ? 'Please enter a valid first name' : ''} // error message
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    value={nameLast}
                    onChange={handleNameLastChange}
                    required
                    fullWidth
                    error={!isNameLastValid}
                    helperText={!isNameLastValid ? 'Please enter a valid last name' : ''} // error message
                />
                <TextField
                    autoFocus
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
    );
}

export default RegistrationDialog;
