import { render, screen, fireEvent } from '@testing-library/react';
import Login from './LoginDialog';

test('should show error message on invalid email and disable login button', () => {
  render(<Login open={true} onClose={() => {}} setAuthToken={() => {}} />);
  const emailInput = screen.getByLabelText('Email Address') as HTMLInputElement;
  const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
  const loginButton = screen.getByRole('button', { name: /login/i });

  // enter invalid email
  fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  expect(loginButton).toBeDisabled();

  // enter valid email and password
  fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  // click login button
  fireEvent.click(loginButton);

  // verify error message is shown
  expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
});
