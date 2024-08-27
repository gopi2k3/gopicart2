import React, { useState, useEffect } from "react";

import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { logoutUser } from "../../actions/userActions";

export default function AdminHeaad() {
  let nav = useNavigate();
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state.authState);

  let [burger, setBurger] = useState(false);
  let [mobileSide, setMobileSide] = useState(false);
  let [profileBtn, setProfileBtn] = useState(false);

  const handleBurger = () => {
    console.log("click1");
    setBurger(!burger);

    let main = document.querySelectorAll(".main-content");
    main.forEach((e) => {
      return e.classList.toggle("active");
    });

    let sidebar = document.querySelector(".app-sidebar");
    sidebar.classList.toggle("active");
  };

  const handleBurger2 = () => {
    setMobileSide(!mobileSide);
  };

  const logOutHandler = () => {
    dispatch(logoutUser);
  };

  return (
    <>
      <header>
        <div className="header-row2 justify-content-between">
          <div className="col-2 col-xl-3">
            <Link to="/home">
              <img
                src="https://play-lh.googleusercontent.com/G7jAks-PRl4d7IkL-s3Ir44nGyPq0Yh872N5UMwZYIJz4wG1Oj0DqoQjsAR5ddKZbQ"
                width="100%"
                height="40px"
              />
            </Link>
          </div>
          <div className="col-3 col-xl-2">
            <div className="header-btn-div text-align-center">
              <button
                type="button"
                className={mobileSide ? "hamburger active" : "hamburger"}
                onClick={handleBurger2}
              >
                <span className="burger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
          <div className="col-7">
            <div
              className="user-toggle d-flex justify-content-end align-items-center"
              onClick={() => setProfileBtn(!profileBtn)}
            >
              <div className="user-icon mr-3">
                <img
                  src={user.avatar}
                  alt="profile-img"
                  className="profile-img"
                />
              </div>
              <div className="user-name">
                <h6 className="mt-2 mb-1">Admin</h6>
                <h5>
                  {user.name}
                  <i className="bi bi-chevron-down mt-2 mr-1 ml-1"></i>
                </h5>

                <div
                  className={
                    profileBtn ? "profile-content active" : "profile-content"
                  }
                >
                  <div>
                    <h6 onClick={() => nav("/myProfile")}>
                      <i className="fa-solid fa-user-tie"></i>
                      Profile
                    </h6>
                    <hr></hr>
                    <h6 onClick={() => logOutHandler()}>
                      <i className="bi bi-box-arrow-left mr-2"></i>
                      Log out
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={burger ? "header-row is-active" : "header-row"}>
          <div
            className={burger ? "header-logo-div is-active" : "header-logo-div"}
          >
            <div className="header-log row align-items-center">
              <Link to="/home">
                <img
                  src="https://play-lh.googleusercontent.com/G7jAks-PRl4d7IkL-s3Ir44nGyPq0Yh872N5UMwZYIJz4wG1Oj0DqoQjsAR5ddKZbQ"
                  width="100px"
                  height="30px"
                />
              </Link>
              <div className="header-btn-div">
                <button
                  type="button"
                  className={burger ? "hamburger active" : "hamburger"}
                  onClick={handleBurger}
                >
                  <span className="burger-box">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="header-contant">
            <div className="header-right col-lg-12">
              <div
                className="user-toggle d-flex justify-content-end align-items-center"
                onClick={() => setProfileBtn(!profileBtn)}
              >
                <div className="user-icon mr-3">
                  <img
                    src={user.avatar}
                    alt="profile-img"
                    className="profile-img"
                  />
                </div>
                <div className="user-name">
                  <h6 className="mt-2 mb-1">Admin</h6>
                  <h5>
                    {user.name}
                    <i className="bi bi-chevron-down mt-2 mr-2 ml-3"></i>
                  </h5>

                  <div
                    className={
                      profileBtn ? "profile-content active" : "profile-content"
                    }
                  >
                    <div>
                      <h6 onClick={() => nav("/myProfile")}>
                        <i className="fa-solid fa-user-tie"></i>
                        Profile
                      </h6>
                      <hr></hr>
                      <h6 onClick={() => logOutHandler()}>
                        <i className="bi bi-box-arrow-left mr-2"></i>
                        Log out
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="app-sidebar">
        <div className="side-content">
          <ul className="sidebar-ul p-0">
            <li className="sidebar-li" onClick={() => nav("/admin/dashboard")}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="side-head ml-3">DashBoard</span>
              </div>
            </li>
            <li className="sidebar-li">
              <div style={{ display: "flex", alignItems: "center" }}>
                <i className="fa fa-product-hunt"></i>
                <span className="side-head ml-3">Products</span>
              </div>
              <ul>
                <li className="sublist" onClick={() => nav("/admin/products")}>
                  <div style={{ display: "flex" }}>
                    <i className="subicon fa fa-basket"></i>
                    <span className="sub-title">All</span>
                  </div>
                </li>
                <li
                  className="sublist"
                  onClick={() => nav("/admin/products/create")}
                >
                  <div style={{ display: "flex" }}>
                    <i className="subicon fa fa-basket"></i>
                    <span className="sub-title">Create</span>
                  </div>
                </li>
              </ul>
            </li>

            <li className="sidebar-li" onClick={() => nav("/admin/orders")}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i className="fa fa-shopping-basket"></i>
                <span className="side-head ml-3">Orders</span>
              </div>
            </li>
            <li className="sidebar-li" onClick={() => nav("/admin/users")}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  className="fa fa-users"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                <span className="side-head ml-3">Users</span>
              </div>
            </li>
            <li className="sidebar-li" onClick={() => nav("/admin/reviews")}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  className="fa fa-users"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                <span className="side-head ml-3">Reviews</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* mobile and tab view side bar ======================== */}

      <div className={mobileSide ? "mobile-sidebar active" : "mobile-sidebar"}>
        <div>
        <ul className="sidebar-ul p-0">
            <li className="sidebar-li" onClick={() => nav("/admin/dashboard")}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="side-head ml-3">DashBoard</span>
              </div>
            </li>
            <li className="sidebar-li">
              <div style={{ display: "flex", alignItems: "center" }}>
                <i className="fa fa-product-hunt"></i>
                <span className="side-head ml-3">Products</span>
              </div>
              <ul>
                <li className="sublist" onClick={() => nav("/admin/products")}>
                  <div style={{ display: "flex" }}>
                    <i className="subicon fa fa-basket"></i>
                    <span className="sub-title">All</span>
                  </div>
                </li>
                <li
                  className="sublist"
                  onClick={() => nav("/admin/products/create")}
                >
                  <div style={{ display: "flex" }}>
                    <i className="subicon fa fa-basket"></i>
                    <span className="sub-title">Create</span>
                  </div>
                </li>
              </ul>
            </li>

            <li className="sidebar-li" onClick={() => nav("/admin/orders")}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i className="fa fa-shopping-basket"></i>
                <span className="side-head ml-3">Orders</span>
              </div>
            </li>
            <li className="sidebar-li" onClick={() => nav("/admin/users")}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  className="fa fa-users"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                <span className="side-head ml-3">Users</span>
              </div>
            </li>
            <li className="sidebar-li" onClick={() => nav("/admin/reviews")}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  className="fa fa-users"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                ></i>
                <span className="side-head ml-3">Reviews</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
