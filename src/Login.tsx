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
    Popover,
    Tooltip,
    Typography,
} from '@mui/material';

type LoginDialogProps = {
    open: boolean;
    onClose: () => void;
};


function LoginDialog(props: LoginDialogProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>(''); // added state variable for error message
    const isDisabled = !(email && password);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const loginTooltipTitle = isDisabled ? 'Email and Password must both be filled out to login' : '';

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
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


    const handleLogin = () => {
        setError("Invalid email or password")
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
