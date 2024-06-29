import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // To manage different steps (1: Email input, 2: OTP verification, 3: New password)

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Implement logic to send OTP to the entered email
    console.log("Send OTP to:", email);
    setStep(2); // Move to OTP verification step
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    // Implement logic to verify OTP entered by user
    // console.log('Verify OTP:', otp);
    setStep(3); // Move to setting new password step
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update password
    // console.log('New password:', newPassword);
    // Show success message or redirect to login after password reset
  };

  return (
    <>
      {step === 1 && (
        <Form
          onSubmit={handleEmailSubmit}
          className="bg-white p-4 rounded shadow"
        >
          <Form.Group controlId="formEmailForgot">
            <Form.Label>Enter your email to reset password</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Submit
          </Button>
        </Form>
      )}

      {step === 2 && (
        <Form
          onSubmit={handleOTPSubmit}
          className="bg-white p-4 rounded shadow"
        >
          <Form.Group controlId="formOTP">
            <Form.Label>Enter OTP sent to your email</Form.Label>
            <Form.Control
              type="text"
              //   value={otp}
              //   onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Verify OTP
          </Button>
        </Form>
      )}

      {step === 3 && (
        <Form
          onSubmit={handlePasswordSubmit}
          className="bg-white p-4 rounded shadow"
        >
          <Form.Group controlId="formNewPassword">
            <Form.Label>Enter new password</Form.Label>
            <Form.Control
              type="password"
              //   value={newPassword}
              //   onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="mb-3"
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm new password</Form.Label>
            <Form.Control
              type="password"
              //   value={newPassword}
              //   onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="mb-3"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Set New Password
          </Button>
        </Form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
