import ListConfig from "./ListConfig";

export default {
  params: {
    apiRoute: "installers",
    parentColumn: "installationId",
    listName: "Installers",
    listItemTypeName: "Installer",
    queryParamsForGetByQuery: {
      attributes: "person_name",
    },
    queryParamsForGetById: {
      attributes: "person_name",
    },
    newItemFormFields: [{ columnName: "person_name", displayName: "Name" }],
  },

  listConfig: class InstallersConfig extends ListConfig {
    getListItemName(item) {
      return {
        itemName: item.person_name,
        itemNameColumnName: "person_name",
      };
    }
  },
};
