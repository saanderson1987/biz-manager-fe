import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import NavBar from "./NavBar";
import CompaniesPage from "./CompaniesPage";
import { RootListWithBorder } from "./List";
import Receivables from "./Receivables";

export default () => (
  <div>
    <NavBar />
    <Switch>
      <Route path="/companies" component={CompaniesPage} />
      <Route path="/jobs" render={() => <RootListWithBorder type="jobs" />} />
      <Route
        path="/orders"
        render={() => <RootListWithBorder type="jobOrders" />}
      />
      <Route
        path="/installations"
        render={() => <RootListWithBorder type="installations" />}
      />
      <Route path="/receivables" render={() => <Receivables />} />
      <Redirect exact from="/" to="/companies" />
      <Route component={NotFound} />
    </Switch>
  </div>
);
