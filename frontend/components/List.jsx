import React, { useContext, useState, useEffect } from "react";
import classNames from "classnames";
import get from "lodash.get";
import { ListDataContext } from "../contexts/ListDataContext";
import { ListContext, ListContextProvider } from "../contexts/ListContext";
import ListItem from "./ListItem";
import NewItemModal from "./NewItemModal";
import ListErrorModal from "./ListErrorModal";

const List = ({ type }) => {
  const { listDataStore, dispatchToListDataStore } = useContext(
    ListDataContext
  );
  const { getListItems, statePath, defaultSortListFunc, listName } = useContext(
    ListContext
  );

  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);

  useEffect(() => {
    getListItems();
  }, [type]);

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
      {listDataStore.error && (
        <ListErrorModal
          error={listDataStore.error}
          closeModal={() =>
            dispatchToListDataStore({ type: "logError", data: "" })
          }
        />
      )}
    </div>
  );
};

export default ({ type, statePath, hooks, doIncludeWrapper }) => (
  <ListContextProvider listType={type} statePath={statePath} hooks={hooks}>
    {doIncludeWrapper ? (
      <div className="list-wrapper">
        <List type={type} />
      </div>
    ) : (
      <List type={type} />
    )}
  </ListContextProvider>
);

<wrap></wrap>;
