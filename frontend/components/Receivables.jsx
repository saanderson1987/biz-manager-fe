import React, { useContext, useState, useEffect } from "react";
import get from "lodash.get";
import {
  ListDataContextProvider,
  ListDataContext,
} from "../contexts/ListDataContext";
import { ListContext, ListContextProvider } from "../contexts/ListContext";
import ItemDetail from "./ItemDetail";
import { RECEIVABLE_STATUSES } from "../list-config/jobs";
import Input from "./shared/Input";

const Filter = ({ filters, setFilters }) => {
  return (
    <div className="filter">
      <span className="filter-el">Filter:</span>
      {Object.entries(filters).map(([filter, value]) => (
        <label className="filter-el">
          <Input
            type="checkbox"
            value={value}
            onChange={(newVal) =>
              setFilters((prev) => ({ ...prev, [filter]: newVal }))
            }
            className="filter-checkbox"
          />
          <span>{filter}</span>
        </label>
      ))}
    </div>
  );
};

const Receivables = () => {
  const { listDataStore } = useContext(ListDataContext);
  const {
    getListItems,
    statePath,
    defaultSortListFunc,
    updateListItem,
    getListItemName,
  } = useContext(ListContext);

  useEffect(() => {
    getListItems();
  }, []);

  const [filters, setFilters] = useState(
    RECEIVABLE_STATUSES.reduce((acc, status) => {
      acc[status] = true;
      return acc;
    }, {})
  );

  const items = Object.values(get(listDataStore, statePath, {}))
    .filter((item) => filters[item.receivableStatus])
    .sort(defaultSortListFunc);

  return (
    <div className="receivables">
      <Filter filters={filters} setFilters={setFilters} />
      <table>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <ItemDetail
                field={{
                  displayName: getListItemName(item).itemName,
                  type: "dropdown",
                  valueOptions: [
                    {
                      value: "PO sent",
                    },
                    { value: "50% paid" },
                    {
                      value: "100% paid",
                    },
                  ],
                }}
                value={item.receivableStatus}
                updateValue={(newValue) =>
                  updateListItem({
                    id: item.id,
                    record: {
                      receivableStatus: newValue || null,
                    },
                  })
                }
              />
              <td style={{ width: "100%" }}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default () => (
  <div className="list-wrapper">
    <ListDataContextProvider>
      <ListContextProvider listType={"receivables"} statePath={["receivables"]}>
        <Receivables />
      </ListContextProvider>
    </ListDataContextProvider>
  </div>
);
