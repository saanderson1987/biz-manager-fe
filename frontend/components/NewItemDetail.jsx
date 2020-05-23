import React from "react";
import Input from "./shared/Input";
import DropdownWithQuery from "./shared/DropdownWithQuery";

const NewItemDetail = ({
  detailValue,
  onValueChange,
  field: {
    displayName,
    columnName,
    type,
    valueOptions,
    dropdownItemType,
    listType,
  },
}) => (
  <tr>
    <td className="item-detail-name">
      {displayName
        ? displayName + ":"
        : columnName.charAt(0).toUpperCase() + columnName.slice(1) + ":"}
    </td>
    <td className="item-detail-value">
      {type === "dropdown-with-query" ? (
        <DropdownWithQuery
          value={detailValue}
          type={dropdownItemType}
          onChange={onValueChange}
          doShowNewButton
        />
      ) : (
        <Input
          value={detailValue}
          type={type}
          onChange={onValueChange}
          valueOptions={valueOptions}
          listType={listType}
        />
      )}
    </td>
  </tr>
);

export default NewItemDetail;
