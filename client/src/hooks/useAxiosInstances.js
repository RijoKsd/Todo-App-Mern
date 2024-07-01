import axios from "axios";
import { useContext, useMemo } from "react";
import { StoreContext } from "../context/StoreContext";

const useAxiosInstances = () => {
  const { token } = useContext(StoreContext);

  const authenticatedAxios = useMemo(() => {
    return axios.create({
      baseURL:
        "https://vercel.com/rijoksds-projects/todo-app-mern-be/EJxzeXkP3HXM6YWB76GdS9pRREmc",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  const unAuthenticatedAxios = useMemo(() => {
    return axios.create({
      baseURL:
        "https://vercel.com/rijoksds-projects/todo-app-mern-be/EJxzeXkP3HXM6YWB76GdS9pRREmc",
    });
  }, []);

 
  return {
    authenticatedAxios,
    unAuthenticatedAxios,
   };
};

export default useAxiosInstances;
