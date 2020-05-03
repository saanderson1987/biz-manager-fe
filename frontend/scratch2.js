import React, { createContext } from "react";

export const ListContext = createContext({});

export const ListContextProvider = ({
  listType,
  parentId,
  statePath,
  children,
}) => {
  const listConfig = createListConfig({
    listType,
    parentId,
    statePath,
    setListDataStore,
  });
  return (
    <ListContext.Provider
      value={{
        getListItems: listConfig.getListItems,
        updateListItem: listConfig.updateListItem,
        // etc.
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

const createListConfig = ({
  listType,
  parentId,
  statePath,
  setListDataStore,
}) =>
  new listConfigByListType[listType]({
    parentId,
    statePath,
    setListDataStore,
    ...listConfigParamsByListType[listType],
  });

const listConfigParamsByListType = {
  jobs: { route: "jobs" /*etc*/ },
};

const listConfigByListType = {
  jobs: ListConfig,
  vendorOrders: VendorOrdersListConfig,
};

class ListConfig {
  constructor({ route, getListItemsQueryParams }) {
    this.route = route;
    this.getListItemsQueryParams = getListItemsQueryParams;
  }

  // dbApiFunctions
  getByQuery(queryParams) {
    return axios.get(baseUrl + this.route, {
      params: queryParams,
    });
  }
  // ...

  // stateUpdateFunctions
  addListItemsToState(itemsById) {
    this.setListDataStore((oldState) =>
      update(cloneDeep(oldState), this.statePath, (currVal) =>
        merge({}, currVal, itemsById)
      )
    );
  }
  // ...

  // dataQueryFunctions
  async getListItems() {
    try {
      const itemsById = await this.getByQuery(this.getListItemsQueryParams);
      this.addListItemsToState(itemsById);
    } catch (e) {
      console.log(e);
    }
  }
  // ...
}
