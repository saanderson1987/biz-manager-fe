import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import NavBar from "./NavBar";
import CompaniesPage from "./CompaniesPage";
import List from "./List";
import Receivables from "./Receivables";

export default () => (
  <div>
    <NavBar />
    <Switch>
      <Route path="/companies" component={CompaniesPage} />
      <Route
        path="/jobs"
        render={() => (
          <List type="jobs" statePath={["jobs"]} doIncludeWrapper={true} />
        )}
      />
      <Route
        path="/orders"
        render={() => (
          <List
            type="jobOrders"
            statePath={["jobOrders"]}
            doIncludeWrapper={true}
          />
        )}
      />
      <Route
        path="/installations"
        render={() => (
          <List
            type="installations"
            statePath={["installations"]}
            doIncludeWrapper={true}
          />
        )}
      />
      <Route
        path="/receivables"
        render={() => (
          <Receivables
            type="receivables"
            statePath={["receivables"]}
            doIncludeWrapper={true}
          />
        )}
      />
      <Redirect exact from="/" to="/companies" />
      <Route component={NotFound} />
    </Switch>
  </div>
);
