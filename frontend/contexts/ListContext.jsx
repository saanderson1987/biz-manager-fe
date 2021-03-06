import React, { createContext, useContext } from "react";
import { ListDataContext } from "./ListDataContext";
import { createListConfig } from "../list-config";

export const ListContext = createContext({});

export const ListContextProvider = ({
  listType,
  statePath,
  hooks,
  children,
}) => {
  const { dispatchToListDataStore } = useContext(ListDataContext);

  const listConfig = createListConfig({
    listType,
    statePath,
    hooks,
    dispatchToListDataStore,
  });

  return (
    <ListContext.Provider
      value={{
        statePath: listConfig.statePath,
        parentColumn: listConfig.parentColumn,
        parentId: listConfig.parentId,
        // dataQueryFunctions
        createListItem: listConfig.createListItem,
        getListItems: listConfig.getListItems,
        getListItemById: listConfig.getListItemById,
        updateListItem: listConfig.updateListItem,
        deleteListItem: listConfig.deleteListItem,
        // List comp
        listName: listConfig.listName,
        defaultSortListFunc: listConfig.defaultSortListFunc,
        // NewItemForm comp
        listItemTypeName: listConfig.listItemTypeName,
        newItemFormFields: listConfig.newItemFormFields,
        addNewItemBaseRecord: listConfig.addNewItemBaseRecord,
        // ListItem comp
        listItemLists: listConfig.listItemLists,
        getListItemName: listConfig.getListItemName,
        getItemWarning: listConfig.getItemWarning,
        // ItemDetails comp
        itemDetailFields: listConfig.itemDetailFields,
        // utils
        createHooks: listConfig.createHooks,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
