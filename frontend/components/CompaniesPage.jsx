import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Tabs, Tab } from "./Tabs";
import { RootList } from "./List";

export default () => (
  <div className="root-container">
    <Tabs>
      <Tab to="/companies/clients">Clients</Tab>
      <Tab to="/companies/prospects">Prospects</Tab>
    </Tabs>
    <Switch>
      <Route
        exact
        path="/companies/clients"
        render={() => <RootList type="clients" statePath={["clients"]} />}
      />
      <Route
        exact
        path="/companies/prospects"
        render={() => <RootList type="prospects" statePath={["prospects"]} />}
      />
      <Redirect exact from="/companies" to="/companies/clients" />
    </Switch>
  </div>
);
