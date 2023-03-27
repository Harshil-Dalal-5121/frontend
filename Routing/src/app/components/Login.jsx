import React, { useState } from "react";
import { useNavigate } from "react-router";

const initialValues = {
  userName: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState(initialValues);
  const { userName, password } = loginInfo;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName === "admin" && password === "admin") {
      localStorage.setItem("Username", userName);
      localStorage.setItem("Password", password);
      localStorage.setItem("authenticated", true);
      navigate("/dashboard");
    } else {
      localStorage.setItem("authenticated", false);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          UserName :
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
          />
          <br />
          Password :
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default Login;
