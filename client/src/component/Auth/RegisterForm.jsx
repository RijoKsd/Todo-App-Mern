import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
   import {  toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import useAxiosInstances from "../../hooks/useAxiosInstances";

const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  image: yup.mixed().required("Profile image is required"),
});

const RegisterForm = () => {

  const { unAuthenticatedAxios } = useAxiosInstances();
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setFormData({
  //       ...formData,
  //       image: file,
  //       imagePreviewUrl: reader.result,
  //     });
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onSave = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("image", data.image[0]);

    try {
      const response = await unAuthenticatedAxios.post("/api/auth/register", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setToken(response.data.token);
      setLoading(false);
       toast.success(response?.data?.message);
      navigate("/todo");
      reset();
    } catch (error) {
      if (error.response) {
         toast.error(error.response?.data?.message);
      }
      setLoading(false);
    }
  };

  return (
    <Container className="form-container p-4 bg-white rounded shadow mb-2">
      <Row>
        <Col>
          <h2 className="text-primary mb-4">Register</h2>
          <Form onSubmit={handleSubmit(onSave)} encType="multipart/form-data">
            {/* {formData.imagePreviewUrl && (
              <div className="text-center mb-3">
                <img
                  src={formData.imagePreviewUrl}
                  alt="Profile Preview"
                  className="img-fluid rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    objectPosition: "top center",
                  }}
                />
              </div>
            )} */}
            <Form.Group controlId="formUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                {...register("name")}
                placeholder="Enter your name"
                required
                className="mb-3"
              />
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="mb-3"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="mb-3"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                className="mb-3"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-danger">
                  {errors.confirmPassword.message}
                </span>
              )}
            </Form.Group>

            <Form.Group controlId="formProfileImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*,.dng"
                className="mb-3"
                {...register("image")}
              />
              {errors.image && (
                <span className="text-danger">
                  {errors.confirmPassword.image}
                </span>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                <span>Register</span>
              )}
            </Button>

            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-primary fw-semibold"
                style={{ cursor: "pointer" }}
              >
                Login
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
