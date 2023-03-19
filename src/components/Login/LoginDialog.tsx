import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import validator from 'validator';


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
import axios from 'axios';
import { AuthToken } from '../../types/AuthToken';
import { LoginDto } from './LoginDto';

type LoginDialogProps = {
    open: boolean;
    onClose: () => void;
    setAuthToken: (token: AuthToken | null) => void;
};


function LoginDialog(props: LoginDialogProps) {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>(''); // added state variable for error message
    const isDisabled = !(email && password && isEmailValid);
    const loginTooltipTitle = isDisabled ? 'Email and Password must both be filled out to login' : '';

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        validator.isEmail(event.target.value) ? setIsEmailValid(true) : setIsEmailValid(false);
        
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        if(event.target.value.length < 8) {
            setError("Password must be at least 8 characters long")
        } else {
            setError("")
        }
    };

    const handleButtonClick = (_: React.MouseEvent<HTMLButtonElement>) => {
            handleLogin();        
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const loginButton = (
        <Button
            onClick={handleButtonClick}
            variant="contained"
            color="primary"
            disabled={isDisabled}>
            Login
        </Button>
    );


    const handleLogin = async () => {
        var loginDto: LoginDto = {
            email: email,
            password: password
        }
        var response = await axios.post(' https://localhost:7015/api/auth/login', loginDto)
        if(response.status !== 200) {
            setError("Invalid email or password")
            console.log(response.data)
        } else {
            var authToken: AuthToken = response.data
            props.setAuthToken(authToken)
            props.onClose()
        }

    };

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
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
                    title={loginTooltipTitle}
                    placement="top"
                >
                    <span>
                        {loginButton}
                    </span>
                </Tooltip>
            </DialogActions>
        </Dialog>
    );
}

export default LoginDialog;
