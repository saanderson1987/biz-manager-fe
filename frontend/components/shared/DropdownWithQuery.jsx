import React, { useState, useEffect, useContext } from "react";
import get from "lodash.get";
import { ListContext, ListContextProvider } from "../../contexts/ListContext";
import { ListDataContext } from "../../contexts/ListDataContext";
import Input from "./Input";
import NewItemModal from "../NewItemModal";

const DropdownWithQuery = ({ value, onChange }) => {
  const { listDataStore } = useContext(ListDataContext);
  const {
    getListItems,
    statePath,
    defaultSortListFunc,
    listItemTypeName,
    getListItemName,
  } = useContext(ListContext);

  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);

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

export default ({ type, value, onChange }) => (
  <ListContextProvider listType={type} statePath={[type]}>
    <DropdownWithQuery value={value} onChange={onChange} />
  </ListContextProvider>
);
