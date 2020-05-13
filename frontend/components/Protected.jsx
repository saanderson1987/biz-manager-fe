import React, { useEffect, useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import Login from "./Login";

const Protected = ({ children }) => {
  const {
    authenticationState: { isAuthenticated },
    getAuthenticationStatus,
  } = useContext(AuthenticationContext);

  useEffect(() => {
    getAuthenticationStatus();
  }, []);

  // these precise statements ensure that if the page is reloaded and user has already been authenticated, the Login page does not flash.
  if (isAuthenticated === true) {
    return children;
  } else if (isAuthenticated === false) {
    return <Login />;
  } else return null;
};

export default Protected;
