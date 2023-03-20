import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as ApiClient from '../../services/apiClient';
import zxcvbn from 'zxcvbn';
import BasicDialog from '../Dialog/BasicDialog';
import { Box, LinearProgress, TextField } from '@mui/material';

type ResetPasswordProps = {
    open: boolean
    handleClose: () => void
};

const ResetPassword = (props: ResetPasswordProps) => {
    const params = useParams<{ token: string }>();
    const [newPassword, setNewPassword] = useState('');
    const [submitTitle, setSubmitTitle] = useState('Submit');
    const [passwordStrength, setPasswordStrength] = useState(0); // added state variable for password strength
    const [error, setError] = useState<string>(''); // added state variable for error message


    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
        const passwordStrength = zxcvbn(event.target.value).score;
        setPasswordStrength(passwordStrength);
    }

    const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value.length < 8) {
            setError("Password must be at least 8 characters long")
        } else {
            setSubmitTitle("Reset")
            setError("")
        }
    }



    const handleSubmit = async () => {
        try {
            await ApiClient.resetPassword({ token: params.token!, password: newPassword });
            // Handle success (e.g., show a success message, navigate to the login page, etc.)
        } catch (error) {
            // Handle errors (e.g., show an error message)
        }
    };

    return (
        <BasicDialog
            open={props.open}
            title={"Reset Password"}
            submitButtonText={submitTitle}
            onClose={props.handleClose}
            onSubmit={handleSubmit}
            isSubmitDisabled={error !== "" || newPassword.length < 8}            
        >
            <>
                <TextField
                    autoFocus
                    margin="dense"
                    id="new-password"
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={newPassword}
                    onBlur={handlePasswordBlur}
                    onChange={handlePasswordChange}
                />
                <Box mt={1}>
                    <LinearProgress
                        variant="determinate"
                        value={(passwordStrength * 100) / 4} // Scale the value from 0-4 to 0-100
                    />
                </Box>
            </>
        </BasicDialog>
    );
};

export default ResetPassword;
