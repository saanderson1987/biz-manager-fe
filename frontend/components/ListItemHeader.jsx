import React, { useState, useEffect } from "react";
import classNames from "classnames";
import ExpansionCaret from "./shared/ExpansionCaret";
import Loader from "./shared/Loader";
import Input from "./shared/Input";
import DisplayValue from "./shared/DisplayValue";
import EditAndSaveButtonRow from "./shared/buttons/EditAndSaveButtonRow";
import DeleteButton from "./shared/buttons/DeleteButton";
import "./ListItemHeader.scss";

const ListItemHeader = ({
  itemName,
  isExpanded,
  toggleExpanded,
  isEditable,
  warning,
  update,
  onClickDelete,
}) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [isValueUpdating, setIsValueUpdating] = useState(false);
  const [editedItemName, setEditedItemName] = useState(itemName);

  useEffect(() => {
    setEditedItemName(itemName);
    if (isValueUpdating) {
      setIsValueUpdating(false);
    }
  }, [itemName]);

  const save = () => {
    setInEditMode(!inEditMode);
    if (editedItemName !== itemName) {
      setIsValueUpdating(true);
      update(editedItemName);
    }
  };

  return (
    <div className="list-item-header">
      <div
        onClick={(e) => {
          if (
            e.target.className.split(" ").includes("expandable-on-click") &&
            !inEditMode
          ) {
            toggleExpanded();
          }
        }}
        style={{ display: "flex", width: "100%" }}
        className="expandable-on-click"
      >
        <ExpansionCaret
          isExpanded={isExpanded}
          className="expandable-on-click"
        />
        <div
          className={classNames("list-item-name", {
            [`list-item-has-warning--${warning && warning.color}`]: warning,
          })}
        >
          {isValueUpdating ? (
            <Loader isInline />
          ) : inEditMode && isEditable ? (
            <Input
              value={editedItemName}
              onChange={setEditedItemName}
              save={save}
            />
          ) : (
            <div className={classNames({ bold: isExpanded })}>
              <DisplayValue value={itemName} className="expandable-on-click" />
              {warning && (
                <div
                  className={classNames(
                    "list-item-warning",
                    "expandable-on-click"
                  )}
                >
                  {warning.message}
                </div>
              )}
            </div>
          )}
        </div>
        {isExpanded && isEditable && (
          <div className={"EditAndSaveButtonRow-container"}>
            <EditAndSaveButtonRow
              save={save}
              inEditMode={inEditMode}
              toggleEditMode={() => setInEditMode(!inEditMode)}
            />
          </div>
        )}
      </div>
      {isExpanded && <DeleteButton onClick={onClickDelete} />}
    </div>
  );
};

export default ListItemHeader;
