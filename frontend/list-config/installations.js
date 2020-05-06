import ListConfig from "./ListConfig";

export default {
  params: {
    apiRoute: "installations",
    parentColumn: "jobOrderId",
    listName: "Installations",
    listItemTypeName: "Installation",
    fieldByWhichToSortList: "installationDate",
    queryParamsForGetByQuery: {
      attributes: "installationDate",
    },
    queryParamsForGetById: {
      attributes: "installationDate,completed",
    },
    listItemLists: [{ type: "installers" }],
    itemDetailFields: [
      {
        columnName: "installationDate",
        displayName: "Install Date",
        type: "date",
      },
      { columnName: "completed", type: "checkbox" },
    ],
    newItemFormFields: [
      {
        columnName: "installationDate",
        displayName: "Install Date",
        type: "date",
      },
      { columnName: "completed", type: "checkbox" },
    ],
  },

  listConfig: class InstallationsListConfig extends ListConfig {
    getListItemName({ installationDate }) {
      return {
        itemName:
          installationDate &&
          `Installation set for ${getDateString(installationDate)}`,
      };
    }
  },
};
