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