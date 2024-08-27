import React from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import { logoutUser } from "../../actions/userActions";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);

  const{items:cartItems}=useSelector((state)=>state.cartState)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logoutUser);
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/home">
            <img
              width="150px"
              src={
                "https://play-lh.googleusercontent.com/G7jAks-PRl4d7IkL-s3Ir44nGyPq0Yh872N5UMwZYIJz4wG1Oj0DqoQjsAR5ddKZbQ"
              }
            />
          </Link>
        </div>
      </div>

      <Search />

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle
              variant="default text-white pr-5"
              id="dropdown-basic"
            >
              <figure className="avatar avatar-nav">
                <Image
                  width="50px"
                  src={user?.avatar || "/images/default_avatar.png"}
                  alt="User Avatar"
                />
              </figure>
              <span>{user?.name || "User"}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="text-dark"
                onClick={() => navigate("/myProfile")}
              >
               My Profile
              </Dropdown.Item>
              {
                user && user.role=='admin' ? <Dropdown.Item
                className="text-dark"
                onClick={() => navigate("/admin/dashboard")}
              >
              Dash Board
              </Dropdown.Item>:null
              }
              
              <Dropdown.Item
                className="text-dark"
                onClick={() => navigate("/orders")}
              >
                My Orders
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={logOutHandler}>
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to={`/`} className="btn" id="login_btn">
            Login
          </Link>
        )}

        <Link to={"/cart"}>
          <span id="cart" className="ml-3">
            Cart
          </span>
        </Link>
        <span className="ml-1" id="cart_count">
          {cartItems.length}
        </span>
      </div>
    </nav>
  );
}
