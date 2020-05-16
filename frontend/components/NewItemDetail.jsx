import React from "react";
import Input from "./shared/Input";
import DropdownWithQueryAndNewButton from "./shared/DropdownWithQueryAndNewButton";

const NewItemDetail = ({
  detailValue,
  onValueChange,
  field: { displayName, columnName, type, valueOptions, dropdownItemType },
}) => (
  <tr>
    <td className="item-detail-name">
      {displayName
        ? displayName + ":"
        : columnName.charAt(0).toUpperCase() + columnName.slice(1) + ":"}
    </td>
    <td className="item-detail-value">
      {type === "dropdown-with-query" ? (
        <DropdownWithQueryAndNewButton
          value={detailValue}
          type={dropdownItemType}
          onChange={onValueChange}
        />
      ) : (
        <Input
          value={detailValue}
          type={type}
          onChange={onValueChange}
          valueOptions={valueOptions}
        />
      )}
    </td>
  </tr>
);

export default NewItemDetail;
