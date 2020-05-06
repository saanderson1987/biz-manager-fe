import ListConfig from "./ListConfig";

export default {
  params: {
    apiRoute: "installers",
    parentColumn: "installationId",
    listName: "Installers",
    listItemTypeName: "Installer",
    queryParamsForGetByQuery: {
      attributes: "name",
    },
    queryParamsForGetById: {
      attributes: "name",
    },
    newItemFormFields: [{ columnName: "name" }],
  },

  listConfig: ListConfig,
};
