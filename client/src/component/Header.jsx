import { Link } from "react-router-dom";
import "../index.css";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
function Header() {

  const {currentUser} = useContext(StoreContext);

  
  return (
    <div className="bg-body-tertiary p-2">
      <div className="d-flex justify-content-end p-2  ">
        <div className="todo-header-profile">
          <img
            src= {currentUser?.image}
            alt="profile"
          />

          <div className="todo-header-links  bg-white p-2 rounded  shadow p-3">
            <Link to="/profile" className="text-dark text-decoration-none">Profile</Link>
            <Link to={`/`} className="text-dark text-decoration-none">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
