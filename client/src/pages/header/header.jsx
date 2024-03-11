import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerCss from "./header.module.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

function Header() {
  const navigate = useNavigate(); 
  const authToken = cookies.get("token");
  const data = cookies.get("data");
  const location = useLocation();

  const isInDashboard = () => {
    return location.pathname !== "/login";
  };

  const handleEmployee = () => {
    navigate("/employees")
  }

  const handleHome = () => {
    navigate("/")
  }

  return (
    <>
      <div className={headerCss.main}>
        <div className={headerCss.left}>
          <span className="material-symbols-outlined">
            admin_panel_settings
          </span>
          <h3>Employee.In</h3>
          {isInDashboard() && (
            <>
              <p onClick={handleHome}>Home</p>
              <p onClick={handleEmployee}>Employee list</p>
            </>
          )}
        </div>
        <div className={headerCss.right}>
          {isInDashboard() && (
            <>
              <p>{data?.data.admin.f_userName}</p>
              <p>LogOut</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
