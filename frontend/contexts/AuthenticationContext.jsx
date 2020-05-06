import React, { createContext, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const baseUrl = process.env.API_HOST;

export const AuthenticationContext = createContext({});

export const AuthenticationContextProvider = ({ children }) => {
  const [authenticationState, setAuthenticationState] = useState({
    isAuthenticated: null /* set to null to prevent the Login screen from flashing upon reload if user is authenticated */,
    error: "",
    user: {},
  });

  const getAuthenticationStatus = async () => {
    try {
      const {
        data: { isAuthenticated, user },
      } = await axios.get(baseUrl + "isAuthenticated");
      setAuthenticationState({ isAuthenticated, user });
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (data) => {
    try {
      const {
        data: { isAuthenticated, user },
      } = await axios.post(baseUrl + "login", data);
      setAuthenticationState({ isAuthenticated, user });
    } catch (e) {
      if (e.response.status === 401) {
        setAuthenticationState((oldState) => ({
          user: {},
          isAuthenticated: false,
          error: "Invalid username or password",
        }));
      }
    }
  };

  const logout = async () => {
    try {
      const {
        data: { isAuthenticated, user },
      } = await axios.get(baseUrl + "logout");
      setAuthenticationState({ isAuthenticated, user });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ authenticationState, getAuthenticationStatus, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
