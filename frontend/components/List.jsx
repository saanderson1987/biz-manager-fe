import React, { useContext, useState, useEffect } from "react";
import classNames from "classnames";
import get from "lodash.get";
import { ListDataContext } from "../contexts/ListDataContext";
import { ListContext, ListContextProvider } from "../contexts/ListContext";
import ListItem from "./ListItem";
import NewItemModal from "./NewItemModal";

const List = () => {
  const { listDataStore } = useContext(ListDataContext);
  const { getListItems, statePath, defaultSortListFunc, listName } = useContext(
    ListContext
  );

  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);

  useEffect(() => {
    getListItems();
  }, []);

  const isRoot = statePath.length === 1;
  const items = Object.values(get(listDataStore, statePath, {})).sort(
    defaultSortListFunc
  );

  return (
    <div className={"list"}>
      {!isRoot && <div className="list-name">{listName}:</div>}
      <div className={classNames("list-items", { "list-items--root": isRoot })}>
        <div
          className={classNames({ "root-list-new-button-container": isRoot })}
        >
          <button
            className="button--new"
            onClick={() => setIsNewItemModalVisible(true)}
          >
            <i className="fas fa-plus-circle"></i>
            <span>Create new</span>
          </button>
        </div>
        {items.map((item, idx) => (
          <ListItem item={item} isFirst={idx === 0} key={item.id} />
        ))}
      </div>
      {isNewItemModalVisible && (
        <NewItemModal closeModal={() => setIsNewItemModalVisible(false)} />
      )}
    </div>
  );
};

export default ({ type, statePath }) => (
  <ListContextProvider listType={type} statePath={statePath}>
    <List />
  </ListContextProvider>
);
