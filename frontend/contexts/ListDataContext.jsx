import React, { createContext } from "react";
import useEnhancedReducer from "react-enhanced-reducer-hook";
import cloneDeep from "lodash.clonedeep";
import merge from "lodash.merge";
import unset from "lodash.unset";
import update from "lodash.update";
import { logger } from "./middlewares";

export const ListDataContext = createContext({});

export const ListDataContextProvider = ({ children }) => {
  const reducer = (oldState, action) => {
    switch (action.type) {
      case "mergeListItems":
        return update(cloneDeep(oldState), action.statePath, (currVal) =>
          merge({}, currVal, action.data)
        );
      case "mergeListItem":
        return update(
          cloneDeep(oldState),
          [...action.statePath, action.data.id],
          (currVal) => merge({}, currVal, action.data)
        );
      case "removeListItem":
        const newState = cloneDeep(oldState);
        unset(newState, [...action.statePath, action.data]);
        return newState;
      default:
        return oldState;
    }
  };

  const initialState = {
    clients: {},
    installations: {},
    jobOrders: {},
    jobs: {},
    prospects: {},
    vendors: {},
  };

  const middlewares = [];
  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  const [listDataStore, dispatchToListDataStore] = useEnhancedReducer(
    reducer,
    initialState,
    middlewares
  );

  return (
    <ListDataContext.Provider
      value={{ listDataStore, dispatchToListDataStore }}
    >
      {children}
    </ListDataContext.Provider>
  );
};
