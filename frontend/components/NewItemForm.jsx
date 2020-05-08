import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { ListContext } from "../contexts/ListContext";
import NewItemDetail from "./NewItemDetail";

const createPendingNewRecord = (newItemFormFields) =>
  newItemFormFields.reduce((acc, field) => {
    if (field.type === "checkbox") {
      acc[field.columnName] = false;
    } else if (field.type === "date") {
      acc[field.columnName] = new Date();
    } else {
      acc[field.columnName] = "";
    }
    return acc;
  }, {});

const NewItemForm = ({ closeModal }) => {
  const {
    authenticationState: { user },
  } = useContext(AuthenticationContext);
  const {
    newItemFormFields,
    listItemTypeName,
    createListItem,
    addNewItemBaseRecord,
  } = useContext(ListContext);

  const [pendingNewRecord, setPendingNewRecord] = useState(
    createPendingNewRecord(newItemFormFields)
  );

  return (
    <div className="form">
      <div className="form-header">Create New {listItemTypeName}</div>
      <div className="form-body">
        <table className="form-table">
          <tbody>
            {newItemFormFields.map((field, i) => (
              <NewItemDetail
                field={field}
                detailValue={pendingNewRecord[field.columnName]}
                displayName={field.displayName}
                onValueChange={(value) =>
                  setPendingNewRecord((prev) => ({
                    ...prev,
                    [field.columnName]: value,
                  }))
                }
                key={i}
              />
            ))}
          </tbody>
        </table>
        <div className="button-row">
          <button onClick={closeModal}>Cancel</button>
          <button
            className="button--save"
            onClick={() => {
              createListItem(addNewItemBaseRecord(pendingNewRecord, user.id));
              closeModal();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewItemForm;
