import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "../public/stylesheets/main.scss";
import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";
import Protected from "./components/Protected";
import App from "./components/App";

render(
  <AuthenticationContextProvider>
    <BrowserRouter>
      <Protected>
        <Route path="/" component={App} />
      </Protected>
    </BrowserRouter>
  </AuthenticationContextProvider>,
  document.getElementById("root")
);
