import React, { useEffect, useContext } from "react";
import get from "lodash.get";
import { ListContext, ListContextProvider } from "../../contexts/ListContext";
import {
  ListDataContextProvider,
  ListDataContext,
} from "../../contexts/ListDataContext";
import DisplayValue from "./DisplayValue";

const QueryDisplay = ({ itemId }) => {
  const { listDataStore } = useContext(ListDataContext);
  const { getListItemById, getListItemName, statePath } = useContext(
    ListContext
  );

  const item = get(listDataStore, [...statePath, itemId]);
  const itemName = item ? getListItemName(item).itemName : "";

  useEffect(() => {
    if (itemId) {
      getListItemById(itemId);
    }
  }, [itemId]);

  return <DisplayValue value={itemName} />;
};
export default ({ listType, itemId }) => (
  <ListDataContextProvider type={listType}>
    <ListContextProvider listType={listType} statePath={[listType]}>
      <QueryDisplay itemId={itemId} />
    </ListContextProvider>
  </ListDataContextProvider>
);
