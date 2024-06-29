import axios from 'axios';
export const checkResetEmail = async (email)=>{
    try{
        const response = await axios.post("http://localhost:5000/api/auth/verify-email", {email});
         return response.data;
    }
    catch(error){
         return error.response.data;
    }
}

export const checkResetOtp = async (email, otp) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/verify-otp",
      { email, otp }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPassword = async (data) => {
    try {
        const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        data
        );
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
