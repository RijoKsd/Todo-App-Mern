 import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import useAxiosInstances from "../hooks/useAxiosInstances";

const AuthRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const {authenticatedAxios} = useAxiosInstances();

  useEffect(() => {
    const checkUser = async () => {
      // if (!token || token === "null") {
      //   // navigate("/", { replace: true });
      //   return;
      // }
      try {
        // const response = await axios.get(
        //   "https://todo-app-mern-production-f614.up.railway.app/api/auth/check-auth",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        const response = await authenticatedAxios.get("/api/auth/check-auth")
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
