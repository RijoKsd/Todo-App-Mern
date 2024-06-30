import axios from "axios";
 import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
   const[currentUser,setCurrentUser] = useState(null);
  const [todos,setTodos] = useState([]);
  
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const getAllTodos = async ()=>{
    try {
      const res = await axios.get("http://localhost:5000/api/todo/list",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setTodos(res.data.todos)
      setCurrentUser(res.data.user)
    }
    catch(err){
      console.log(err)
    
    }
  }

  useEffect(()=>{
    if(token){
      getAllTodos()
     }
  },[token])
  


  const store = {
    setToken,
    token,
    todos,
    currentUser,
    getAllTodos,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
