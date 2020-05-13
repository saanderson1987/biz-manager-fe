import ListConfig from "./ListConfig";

export default {
  params: {
    apiRoute: "companies",
    listName: "Companies",
    listItemTypeName: "Company",
    queryParamsForGetByQuery: {
      attributes: "name",
    },
    queryParamsForGetById: {
      attributes: "name,status",
    },
    listItemLists: [{ type: "contacts" }, { type: "notes" }, { type: "jobs" }],
    itemDetailFields: [
      {
        columnName: "status",
        type: "radio",
        valueOptions: [{ value: "prospect" }, { value: "client" }],
      },
    ],
    newItemFormFields: [
      { columnName: "name" },
      {
        columnName: "status",
        type: "radio",
        valueOptions: [{ value: "prospect" }, { value: "client" }],
      },
    ],
  },

  listConfig: ListConfig,
};
