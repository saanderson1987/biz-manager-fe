import React, { createContext, useState } from "react";

export const ListDataContext = createContext({});

export const ListDataContextProvider = ({ children }) => {
  const [listDataStore, setListDataStore] = useState({
    clients: {},
    installations: {},
    jobOrders: {},
    jobs: {},
    prospects: {},
    vendors: {},
  });

  return (
    <ListDataContext.Provider value={{ listDataStore, setListDataStore }}>
      {children}
    </ListDataContext.Provider>
  );
};
