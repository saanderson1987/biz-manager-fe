import React, { useEffect, useContext, useState } from "react";
import get from "lodash.get";
import { ListContext, ListContextProvider } from "../../contexts/ListContext";
import {
  ListDataContextProvider,
  ListDataContext,
} from "../../contexts/ListDataContext";
import Input from "./Input";
import NewItemModal from "../NewItemModal";

const NewButton = () => {
  const { listItemTypeName } = useContext(ListContext);
  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);

  return (
    <>
      <div>
        <button
          className="button--new"
          onClick={() => setIsNewItemModalVisible(true)}
        >
          <i className="fas fa-plus-circle"></i>
          <span>Create new {listItemTypeName}</span>
        </button>
      </div>
      {isNewItemModalVisible && (
        <NewItemModal closeModal={() => setIsNewItemModalVisible(false)} />
      )}
    </>
  );
};

const DropdownWithQuery = ({ value, onChange, doShowNewButton }) => {
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
    <>
      <Input
        value={value}
        type={"dropdown"}
        placeholder={` -- Select a ${listItemTypeName} -- `}
        onChange={onChange}
        valueOptions={items.map((item) => ({
          value: item.id,
          displayName: getListItemName(item).itemName,
        }))}
      />
      {doShowNewButton && <NewButton />}
    </>
  );
};

export default ({ type, value, onChange, doShowNewButton }) => (
  <ListDataContextProvider type={type}>
    <ListContextProvider listType={type} statePath={[type]}>
      <DropdownWithQuery
        value={value}
        onChange={onChange}
        doShowNewButton={doShowNewButton}
      />
    </ListContextProvider>
  </ListDataContextProvider>
);
