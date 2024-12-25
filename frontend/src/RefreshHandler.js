import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/authentication/sign-in" ||
        location.pathname === "/authentication/sign-up"
      ) {
        navigate("/dashboard", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);
  return <div>RefreshHandler</div>;
}

//Prop-Types Validation
RefreshHandler.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default RefreshHandler;
