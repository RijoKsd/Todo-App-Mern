import axios from "axios";
import { useContext, useMemo } from "react";
import { StoreContext } from "../context/StoreContext";

const useAxiosInstances = () => {
  const { token } = useContext(StoreContext);

  const authenticatedAxios = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:5000",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  const unAuthenticatedAxios = useMemo(() => {
    return axios.create({
      baseURL: "https://todo-app-mern-production-f614.up.railway.app",
    });
  }, []);

  const baseURL = "https://todo-app-mern-production-f614.up.railway.app";

  return {
    authenticatedAxios,
    unAuthenticatedAxios,
    baseURL
  };
};

export default useAxiosInstances;
