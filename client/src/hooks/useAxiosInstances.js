import axios from "axios";
import { useContext, useMemo } from "react";
import { StoreContext } from "../context/StoreContext";

const useAxiosInstances = () => {
  const { token } = useContext(StoreContext);

  const authenticatedAxios = useMemo(() => {
    return axios.create({
      baseURL:
        "https://todo-app-mern-be-git-main-rijoksds-projects.vercel.app",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  const unAuthenticatedAxios = useMemo(() => {
    return axios.create({
      baseURL:
        "https://todo-app-mern-be-git-main-rijoksds-projects.vercel.app",
    });
  }, []);

 
  return {
    authenticatedAxios,
    unAuthenticatedAxios,
   };
};

export default useAxiosInstances;
