import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { HiHome } from "react-icons/hi2";

function Header() {
  const {currentUser,setToken} = useContext(StoreContext);
  const navigate = useNavigate();

  const logoutUser = () => {
     setToken(null);
    navigate("/", { replace: true })
  };

  
  return (
    <div className="bg-body-tertiary p-2">
      <div className="d-flex justify-content-end p-2 align-items-center">
        <div className=" mx-5">
          <Link to="/todo">
            <HiHome size={30} className=" text-dark" />
          </Link>
        </div>

        <div className="todo-header-profile">
          <img src={currentUser?.image} alt="profile" />

          <div className="todo-header-links   bg-white p-2 rounded  shadow p-3">
            <Link to="/profile" className="text-dark text-decoration-none mb-1">
              Profile
            </Link>
            <p className="text-dark  m-0" onClick={logoutUser}>
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
