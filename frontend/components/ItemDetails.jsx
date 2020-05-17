import React, { useContext, useEffect } from "react";
import get from "lodash.get";
import { ListDataContext } from "../contexts/ListDataContext";
import { ListContext } from "../contexts/ListContext";
import ItemDetail from "./ItemDetail";

const ItemDetails = ({ itemId }) => {
  const { listDataStore } = useContext(ListDataContext);
  const {
    getListItemById,
    updateListItem,
    statePath,
    itemDetailFields,
  } = useContext(ListContext);

  const item = get(listDataStore, [...statePath, itemId]);

  useEffect(() => {
    if (itemId) {
      getListItemById(itemId);
    }
  }, [itemId]);

  return (
    item && (
      <table>
        <tbody>
          {itemDetailFields.map((field, i) => (
            <tr key={i}>
              <ItemDetail
                field={field}
                value={item[field.columnName]}
                updateValue={(newValue) =>
                  updateListItem({
                    id: item.id,
                    record: {
                      [field.columnName]: newValue || null,
                    },
                  })
                }
              />
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

export default ItemDetails;
