import ListConfig from "./ListConfig";

export default {
  params: {
    apiRoute: "people",
    parentColumn: "companyId",
    listName: "Contacts",
    listItemTypeName: "Contact",
    queryParamsForGetByQuery: {
      attributes: "name",
    },
    queryParamsForGetById: {
      attributes: "name,phoneNum,email,position,companyId",
    },
    itemDetailFields: [
      {
        columnName: "companyId",
        displayName: "Company",
        type: "queryDisplay",
        listType: "companies",
      },
      { columnName: "name", type: "text" },
      { columnName: "phoneNum", displayName: "Phone Number", type: "text" },
      { columnName: "email", type: "text" },
      { columnName: "position", type: "text" },
    ],
    newItemFormFields: [
      { columnName: "name" },
      { columnName: "phoneNum", displayName: "Phone Number" },
      { columnName: "email" },
      { columnName: "position" },
    ],
  },

  listConfig: ListConfig,
};
