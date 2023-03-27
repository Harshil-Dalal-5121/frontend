import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const initalize = useRef();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");

    if (loggedInUser) {
      setIsLoggedIn(true);
    }
    initalize.current = true;
  }, []);

  if (!isLoggedIn && initalize.current) {
    return (
      <>
        <Navigate replace to="/" />
      </>
    );
  } else {
    return (
      <div>
        <p>Welcome to your Dashboard</p>
        <button onClick={() => logout()}>Logout</button>
      </div>
    );
  }
};

export default Dashboard;
