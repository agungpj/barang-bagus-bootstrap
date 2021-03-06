import React, { useContext } from "react";

import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

import { UserContext } from "../context/userContext";

import ImgDumbMerch from "../assets/DumbMerch.png";

export default function Navbar(props) {
  const [state, dispatch] = useContext(UserContext);

  let history = useHistory();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    history.push("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-sm-fluid container navbar-img">
        <Link to="/">
          <img src={ImgDumbMerch} alt="" className="navbar-img " />
        </Link>

        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mt-3" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
            <li className="nav-item me-3  ">
              <NavLink to="/complain" className="nav-link active">
                Complain
              </NavLink>
            </li>

            <li className="nav-item me-3">
              <NavLink to="/profile" className="nav-link active">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={logout}
                to="/login"
                className="nav-link active "
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
