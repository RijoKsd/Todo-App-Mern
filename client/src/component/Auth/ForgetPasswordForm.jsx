import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { checkResetEmail } from "../../hooks/useResetPassword";

const emailSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // To manage different steps (1: Email input, 2: OTP verification, 3: New password)

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const onSave =async (data) => {
    const { email } = data;
    try{
      const response = await checkResetEmail(email);
       if(response.success){
        setEmail(email);
        alert(response.message);
        setStep(2);
      }else{
        alert(response.message);
      }
    }catch(err){
      console.log(err);
    }
   
  };
 
  const handleOTPSubmit = (e) => {
    e.preventDefault();

    setStep(3); // Move to setting new password step
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
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
