import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  const loggedInUser = JSON.parse(localStorage.getItem("authenticated"));

  useEffect(() => {
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
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
