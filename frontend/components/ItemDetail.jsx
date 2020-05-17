import React, { useContext, useState, useEffect, createRef } from "react";
import classNames from "classnames";
import { ListDataContext } from "../contexts/ListDataContext";
import Loader from "./shared/Loader";
import Input from "./shared/Input";
import DisplayValue from "./shared/DisplayValue";
import EditAndSaveButtonRow from "./shared/button/EditAndSaveButtonRow";

const formatDetailValueState = (value, type) => {
  if (type === "date") {
    return value ? new Date(value) : new Date();
  }
  return value;
};

const ItemDetail = ({
  field: {
    columnName,
    displayName,
    type,
    getDisplayValue,
    valueOptions,
    isReadOnly,
    listType, // for 'queryDisplay' type
  },
  value,
  updateValue,
}) => {
  const { error } = useContext(ListDataContext);
  const [inEditMode, setInEditMode] = useState(false);
  const [isValueUpdating, setIsValueUpdating] = useState(false);
  const [editedValue, setEditedValue] = useState(
    formatDetailValueState(value, type)
  );
  useEffect(() => {
    setEditedValue(formatDetailValueState(value, type));
    if (isValueUpdating) {
      setIsValueUpdating(false);
    }
  }, [value, error]);

  useEffect(() => {
    if (
      inEditMode &&
      inputToFocusRef.current &&
      inputToFocusRef.current.focus
    ) {
      inputToFocusRef.current.focus();
    }
  }, [inEditMode]);

  const save = () => {
    setInEditMode(!inEditMode);
    if (editedValue !== value) {
      setIsValueUpdating(true);
      updateValue(editedValue);
    }
  };

  const inputToFocusRef = createRef();

  return (
    <>
      <td className="item-detail-name">
        {displayName
          ? displayName
          : columnName.charAt(0).toUpperCase() + columnName.slice(1)}
        :
      </td>
      <td className="item-detail-value">
        {isValueUpdating ? (
          <Loader isInline />
        ) : inEditMode ? (
          <Input
            value={editedValue}
            type={type}
            onChange={setEditedValue}
            valueOptions={valueOptions}
            listType={listType}
            save={save}
            inputRef={inputToFocusRef}
            className={classNames({ "text-align-right": type !== "text-box" })}
          />
        ) : (
          <DisplayValue
            value={getDisplayValue ? getDisplayValue(value) : value}
            type={type}
            listType={listType}
          />
        )}
      </td>
      {!isReadOnly && (
        <td className="item-detail-edit-and-save">
          <EditAndSaveButtonRow
            save={save}
            inEditMode={inEditMode}
            toggleEditMode={() => {
              setInEditMode(!inEditMode);
            }}
          />
        </td>
      )}
    </>
  );
};

export default ItemDetail;
