import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import ForgotPasswordForm from "./ForgetPasswordForm"; // Import ForgotPasswordForm component
// import OTPVerification from "./OTPVerification"; // Import OTPVerification component

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false); // State to manage error display
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to manage showing forgot password form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here
    // For example, you can check credentials, authenticate user, etc.
    console.log("Form submitted:", formData);

    // For demonstration, show error message if login fails
    setShowError(true);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center vh-100">
        <Col md={6}>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-center mb-4">Login</h2>
            {showError && (
              <Alert
                variant="danger"
                onClose={() => setShowError(false)}
                dismissible
              >
                Invalid email or password. Please try again.
              </Alert>
            )}
            {!showForgotPassword ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Login
                </Button>
              </Form>
            ) : (
              // Render ForgotPasswordForm component if showForgotPassword is true
              <ForgotPasswordForm />
            )}

            <div className="mt-3 text-center">
              {!showForgotPassword ? (
                <>
                  <p
                    className="text-primary"
                    onClick={handleForgotPassword}
                    style={{ cursor: "pointer" }}
                  >
                    Forgot password?
                  </p>
                  <span> | </span>
                </>
              ) : null}

              <p className="text-primary ml-3">Create an account</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
