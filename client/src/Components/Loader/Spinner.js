import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/${path}`, {
        state: location.pathname
    });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1>Redirecting to you in {count} second</h1>
        <ScaleLoader
          color="navy"
          margin={2}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default Spinner;
