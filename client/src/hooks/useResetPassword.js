 export const checkResetEmail = async (email, unAuthenticatedAxios) => {
    try {
     const response = await unAuthenticatedAxios.post("/api/auth/verify-email", {email});
     return response.data;
   } catch (error) {
     return error.response.data;
   }
 };

export const checkResetOtp = async (email, otp, unAuthenticatedAxios) => {
  try {
    const response = await unAuthenticatedAxios.post("/api/auth/verify-otp",{email,otp})
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPassword = async (data, unAuthenticatedAxios) => {
  try {
    const response = await unAuthenticatedAxios.post("/api/auth/reset-password", data)
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
