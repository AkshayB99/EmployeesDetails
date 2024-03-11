import React from "react";
import { useState } from "react";
import loginCss from "./login.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    f_userName: "",
    f_Pwd: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.f_userName || !user.f_Pwd) {
      setError("Username and password are required.");
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      cookies.set("token", data.token);
      cookies.set("data", data);
      if (data.error && data.error.status) {
        setError(data.message);
      }
      if (data.token) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={loginCss.main}>
        <div className={loginCss.box}>
          <form className={loginCss.form}>
            <div className={loginCss.input}>
              <span
                className="material-symbols-outlined"
                style={{ color: "#797979" }}
              >
                person
              </span>
              <input
                type="text"
                placeholder="Username"
                className={loginCss.inputBox}
                onChange={(e) =>
                  setUser({ ...user, f_userName: e.target.value })
                }
              />
            </div>
            <div className={loginCss.input}>
              <span
                className="material-symbols-outlined"
                style={{ color: "#797979" }}
              >
                lock
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={loginCss.inputBox}
                onChange={(e) => setUser({ ...user, f_Pwd: e.target.value })}
              />
              <span
                className="material-symbols-outlined"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", color: "#797979" }}
              >
                visibility
              </span>
            </div>
            {/* {error && <p className={loginCss.error}>{error}</p>} */}
            <button className={loginCss.login} onClick={handleSubmit}>
              Log in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default login;
