import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false); // State to manage error display

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

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
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

          <div className="mt-3 text-center">
            <p to="/forgot-password" className="mr-3">
              Forgot password?
            </p>
            <span> | </span>
            <p to="/register" className="ml-3">
              Create an account
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
