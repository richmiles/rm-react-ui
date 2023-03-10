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
    const isDisabled = !(email && password);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const loginTooltipTitle = isDisabled ? 'Email and Password must both be filled out to login' : '';

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
            setAnchorEl(event.currentTarget);
        } else {
            handleLogin();
        }
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const buttonElement = (
        <Button
            onClick={handleButtonClick}
            variant="contained"
            color="primary"
            disabled={isDisabled}
        >
            Login
        </Button>
    );

    const tooltipContent = (
        <Typography
            sx={{ p: 2 }}
            variant="subtitle2"
            color="text.secondary"
        >
            {loginTooltipTitle}
        </Typography>
    );



    const handleLogin = () => {
        // TODO: Implement login logic
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
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>

                    <Tooltip
                        title={loginTooltipTitle}
                        placement="top"
                    >
                        <span>
                            {buttonElement}
                        </span>
                    </Tooltip>                
            </DialogActions>
        </Dialog>
    );
}

export default LoginDialog;
