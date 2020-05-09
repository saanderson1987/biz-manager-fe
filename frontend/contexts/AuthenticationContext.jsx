import React, { createContext, useState } from "react";
import useEnhancedReducer from "react-enhanced-reducer-hook";
import axios from "axios";
import { logger } from "./middlewares";

axios.defaults.withCredentials = true;

const baseUrl = process.env.API_HOST;

export const AuthenticationContext = createContext({});

export const AuthenticationContextProvider = ({ children }) => {
  const reducer = (oldState, action) => {
    switch (action.type) {
      case "updateAuthenticationStatus":
        return action.data;
      default:
        return oldState;
    }
  };

  const middlewares = [];
  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }
  const [authenticationState, dispatch] = useEnhancedReducer(
    reducer,
    {
      isAuthenticated: null /* set to null to prevent the Login screen from flashing upon reload if user is authenticated */,
      error: "",
      user: {},
    },
    middlewares
  );

  const getAuthenticationStatus = async () => {
    try {
      const {
        data: { isAuthenticated, user },
      } = await axios.get(baseUrl + "isAuthenticated");
      dispatch({
        type: "updateAuthenticationStatus",
        data: { isAuthenticated, user },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (data) => {
    try {
      const {
        data: { isAuthenticated, user },
      } = await axios.post(baseUrl + "login", data);
      dispatch({
        type: "updateAuthenticationStatus",
        data: { isAuthenticated, user },
      });
    } catch (e) {
      if (e.response.status === 401) {
        dispatch({
          type: "updateAuthenticationStatus",
          data: {
            user: {},
            isAuthenticated: false,
            error: "Invalid username or password",
          },
        });
      }
    }
  };

  const logout = async () => {
    try {
      const {
        data: { isAuthenticated, user },
      } = await axios.get(baseUrl + "logout");
      dispatch({
        type: "updateAuthenticationStatus",
        data: { isAuthenticated, user },
      });
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
