import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from '@mui/material';

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        // TODO: handle form submission
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
            <Container maxWidth="md">
                <Typography variant="h3" align="center" gutterBottom>
                    Register for our Service
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        maxWidth: '400px',
                        margin: '0 auto'
                      }}
                >
                    <TextField
                        label="First Name"
                        variant="outlined"
                        size="small"
                        fullWidth={!isMobile}
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        size="small"
                        fullWidth={!isMobile}
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth={!isMobile}
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        size="small"
                        fullWidth={!isMobile}
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ ml: isMobile ? 0 : '1rem' }}
                    >
                        Register
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default RegisterForm;
