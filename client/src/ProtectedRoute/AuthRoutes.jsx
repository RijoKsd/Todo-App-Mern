import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const AuthRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);

  useEffect(() => {
    const checkUser = async () => {
      // if (!token || token === "null") {
      //   // navigate("/", { replace: true });
      //   return;
      // }
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check-auth",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
 
        if (data.success === true) {
          navigate("/todo", { replace: true });
        }
      } catch (error) {
        if (window.location.pathname === "/register") {
          return;
        }
        navigate("/", { replace: true });
      }
    };
    checkUser();
  }, [navigate, token]);

  return children;
};

export default AuthRoutes;
