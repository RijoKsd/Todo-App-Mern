import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuth, setIsAuth] = useState(false);
    // const verifyAuth = async () => {
    //      if (!token) {
    //        setIsAuth(false);
    //        return;
    //      }
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:5000/api/auth/check-auth",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     console.log(response.data, "verifyAuth from context");
    //     setIsAuth(true);
    //   } catch (error) {
    //      setIsAuth(false);
    //   }
    // };
  useEffect(() => {
    localStorage.setItem("token", token);
    // verifyAuth();
  }, [token]);

  


  const store = {
    setToken,
    token,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
