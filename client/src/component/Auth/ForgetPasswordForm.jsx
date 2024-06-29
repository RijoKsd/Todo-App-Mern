import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  checkResetEmail,
  checkResetOtp,
  resetPassword,
} from "../../hooks/useResetPassword";
import { useNavigate } from "react-router-dom";

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
        alert(response.message);
        setStep(2);
      } else {
        setLoading(false);
        alert(response.message);
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

        alert(response.message);
      } else {
        setLoading(false);
        alert(response.message);
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
        alert(response.message);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
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
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            {loading ? "Sending Otp..." : "Send OTP"}
          </Button>
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
              placeholder="Enter OTP"
              pattern="[0-9]{6}"
              {...register("otp")}
            />
            {errors.otp && <p className="text-danger">{errors.otp.message}</p>}
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </Button>
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
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Set New Password
          </Button>
        </Form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
