import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ForgotPasswordForm from "./ForgetPasswordForm";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to manage

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSave = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      console.log(response.data);
      alert(response?.data?.message);
      setLoading(false);
      reset();
    } catch (error) {
      if (error.response) {
        alert(error.response?.data?.message);
      }
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <Container className="form-container p-4 bg-white rounded shadow mb-2">
      <Row>
        <Col>
          <div>
            {!showForgotPassword ? (
              <>
                <h2 className="text-center mb-4">Login</h2>

                <Form onSubmit={handleSubmit(onSave)}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      {...register("email")}
                      placeholder="Enter your email"
                    />
                    <p className="text-danger">{errors.email?.message}</p>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      {...register("password")}
                      placeholder="Enter your password"
                    />
                    <p className="text-danger">{errors.password?.message}</p>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-3"
                  >
                    {loading ? "Checking user..." : "Login"}
                  </Button>
                </Form>
              </>
            ) : (
              // Render ForgotPasswordForm component if showForgotPassword is true
              <ForgotPasswordForm />
            )}

            <div className="mt-3 text-center">
              {!showForgotPassword ? (
                <Link
                  to="/forgot-password"
                  className="text-primary"
                  onClick={handleForgotPassword}
                  style={{ cursor: "pointer" }}
                >
                  Forgot password?
                </Link>
              ) : (
                <Link
                  className="text-primary"
                  onClick={() => setShowForgotPassword(false)}
                  style={{ cursor: "pointer" }}
                >
                  Back to login
                </Link>
              )}

              <span> | </span>
              <Link to="/register" className="text-primary ml-3">
                Create an account
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
