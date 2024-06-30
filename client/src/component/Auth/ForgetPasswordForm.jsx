import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  checkResetEmail,
  checkResetOtp,
  resetPassword,
} from "../../hooks/useResetPassword";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosInstances from "../../hooks/useAxiosInstances";

const emailSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});
// otp verification schema
const otpSchema = yup.object().shape({
  otp: yup
    .number()
    .typeError("OTP must be a number")
    .required("OTP is required"),
});

const resetPasswordSchema = yup.object().shape({
  password: yup.string().required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ForgotPasswordForm = () => {
  // const { authenticatedAxios } = useAxiosInstances();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema, otpSchema, resetPasswordSchema),
  });

  // verify email
  const onSave = async (data) => {
    setLoading(true);
    const { email } = data;

    try {
      const response = await checkResetEmail(email);
      if (response.success) {
        setEmail(email);
        setLoading(false);
         toast.success(response.message);

        setStep(2);
      } else {
        setLoading(false);
         toast.error(response.message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // verify otp
  const handleOTPSubmit = async (data) => {
    setLoading(true);
    // Call API to verify OTP
    const { otp } = data;
    try {
      const response = await checkResetOtp(email, otp);
      if (response.success) {
        setLoading(false);
        setStep(3);

         toast.success(response.message);
      } else {
        setLoading(false);
         toast.error(response.message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // set new password

  const handlePasswordSubmit = async (data) => {
    setLoading(true);
    const datas = { email, ...data };

    try {
      const response = await resetPassword(datas);
      if (response.success) {
        setLoading(false);
         toast.success(response.message);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {step === 1 && (
        <Form
          onSubmit={handleSubmit(onSave)}
          className="bg-white p-4 rounded shadow"
        >
          <Form.Group controlId="formEmailForgot">
            <Form.Label>Enter your email to reset password</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              autoFocus
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3"
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Send OTP"
            )}
          </Button>

          <div className="mt-3 text-center">
            <Link
              className="text-primary"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Back to login
            </Link>

            <span> | </span>
            <Link to="/register" className="text-primary ml-3">
              Create an account
            </Link>
          </div>
        </Form>
      )}

      {step === 2 && (
        <Form
          onSubmit={handleSubmit(handleOTPSubmit)}
          className="bg-white p-4 rounded shadow"
        >
          <Form.Group controlId="formOTP">
            <Form.Label>Enter OTP sent to your email</Form.Label>
            <Form.Control
              type="text"
              name="otp"
              autoFocus
              placeholder="Enter OTP"
              {...register("otp")}
            />
            {errors.otp && <p className="text-danger">{errors.otp.message}</p>}
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3"
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Verify OTP"
            )}
          </Button>
          <div className="mt-3 text-center">
            <Link
              className="text-primary"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Back to login
            </Link>

            <span> | </span>
            <Link to="/register" className="text-primary ml-3">
              Create an account
            </Link>
          </div>
        </Form>
      )}

      {step === 3 && (
        <Form
          onSubmit={handleSubmit(handlePasswordSubmit)}
          className="bg-white p-4 rounded shadow"
        >
          <Form.Group controlId="formNewPassword">
            <Form.Label>Enter new password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              autoFocus
              placeholder="Enter new password"
              className="mb-3"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm new password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              className="mb-3"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword.message}</p>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3"
            disabled={loading}
          >
            {
              loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Reset Password"
              )
            }
            
          </Button>
        </Form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
