import React, { useState } from "react";
import DropdownWithQuery from "./DropdownWithQuery";
import NewItemModal from "../NewItemModal";

export default ({ type, value, onChange }) => {
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
