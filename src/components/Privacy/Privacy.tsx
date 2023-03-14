import { Container, Typography } from '@mui/material';

function PrivacyPolicy() {
    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Typography variant="h4" sx={{}}>
                Privacy Policy
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>
                Updated on 2023-03-14
            </Typography>
            <Typography variant="h5" sx={{}}>
                Introduction
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                This privacy policy explains how we collect, use, and protect personal information. By using our website or services, you agree to this privacy policy.
            </Typography>
            <Typography variant="h5" sx={{}}>
                Types of information we collect
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                We collect your name, email address, date of birth, and payment information (if applicable) when you use our services. We also collect information about how you use our website, such as the pages you visit and links you click on.
            </Typography>
            <Typography variant="h5" sx={{}}>
                How we use your information
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                We use your personal information to provide services and communicate with you about your account or our services. We may also use your personal information to send you marketing materials about our products and services.
            </Typography>
            <Typography variant="h5" sx={{}}>
                Why we collect your information
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                We collect your personal information because we need it to provide our services to you, and to improve and promote our services. We also collect information to comply with legal requirements.
            </Typography>
            <Typography variant="h5" sx={{}}>
                How we share your information
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share your personal information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
            </Typography>
            <Typography variant="h5" sx={{}}>
                How long we keep your information
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                We keep your personal information for as long as necessary to fulfill the purposes for which it was collected, unless a longer retention period is required or permitted by law.
            </Typography>
            <Typography variant="h5" sx={{}}>
                How we protect your information
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                We implement security measures to protect your personal information, including encryption and access controls.
            </Typography>
            <Typography variant="h5" sx={{}}>
                Your rights
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                You have the right to access, correct, delete, restrict processing, and receive a copy of your personal information. You also have the right to object to the processing of your personal information.
            </Typography>
            <Typography variant="h5" sx={{}}>
                Cookies
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                We use cookies and similar technologies to provide and improve our services, analyze usage, and personalize content and ads. You can control cookie settings in your browser or device settings.
            </Typography>
            <Typography variant="h5" sx={{}}>
                Changes to this privacy policy
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                We may update this privacy policy from time to time. You should check this page occasionally to ensure you are happy with any changes.
            </Typography>
            <Typography variant="h5" sx={{}}>
                Contact us
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                If you have any questions or concerns about this privacy policy or our treatment of your personal information, please contact us at [insert contact information].
            </Typography>
        </Container >
    );
}

export default PrivacyPolicy;
