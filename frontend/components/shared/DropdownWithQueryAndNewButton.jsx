import React, { useContext, useState } from "react";
import { ListContext } from "../../contexts/ListContext";
import DropdownWithQuery from "./DropdownWithQuery";
import NewItemModal from "../NewItemModal";

export default ({ type, value, onChange }) => {
  const { listItemTypeName } = useContext(ListContext);
  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);

  return (
    <>
      <DropdownWithQuery value={value} type={type} onChange={onChange} />
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