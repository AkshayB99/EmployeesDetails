import React from "react";
import { useEffect } from "react"; 
import dashbordCss from "./dashbord.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function dashbord() {
  const navigate = useNavigate();
  const authToken = cookies.get("token");
  const data = cookies.get("data");

//   console.log(data);

  useEffect(() => {
    const redirectToLogin = () => {
      if (!authToken) {
        navigate("/login");
      }
    };

    redirectToLogin();
  }, [authToken, navigate]);

  return (
    <>
      <div className={dashbordCss.main}>
        <p>Welcome To Admin Panel</p>
      </div>
    </>
  );
}

export default dashbord;
