import React, { useEffect, useContext } from "react";
import get from "lodash.get";
import { ListContext, ListContextProvider } from "../../contexts/ListContext";
import {
  ListDataContextProvider,
  ListDataContext,
} from "../../contexts/ListDataContext";
import Input from "./Input";

const DropdownWithQuery = ({ value, onChange }) => {
  const { listDataStore } = useContext(ListDataContext);
  const {
    getListItems,
    statePath,
    defaultSortListFunc,
    listItemTypeName,
    getListItemName,
  } = useContext(ListContext);

  useEffect(() => {
    getListItems();
  }, []);

  const items = Object.values(get(listDataStore, statePath, {})).sort(
    defaultSortListFunc
  );

  return (
    <Input
      value={value}
      type={"dropdown"}
      onChange={onChange}
      valueOptions={[
        {
          value: "",
          displayName: ` -- select a ${listItemTypeName} -- `,
          isDisabled: true,
        },
        ...items.map((item) => ({
          value: item.id,
          displayName: getListItemName(item).itemName,
        })),
      ]}
    />
  );
};

export default ({ type, value, onChange }) => (
  <ListDataContextProvider type={type}>
    <ListContextProvider listType={type} statePath={[type]}>
      <DropdownWithQuery value={value} onChange={onChange} />
    </ListContextProvider>
  </ListDataContextProvider>
);
