import ListConfig from "./ListConfig";
import { getDateString } from "../../utils";

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
      attributes: "installationDate,completed,jobOrderId",
    },
    listItemLists: [{ type: "installers" }],
    itemDetailFields: [
      {
        columnName: "jobOrderId",
        displayName: "Job Order",
        type: "queryDisplay",
        listType: "jobOrders",
        isReadOnly: true,
      },
      {
        columnName: "installationDate",
        displayName: "Install Date",
        type: "date",
      },
      { columnName: "completed", type: "checkbox" },
    ],
    newItemFormFields: [
      {
        columnName: "jobOrderId",
        displayName: "Job Order",
        type: "queryDisplay",
        listType: "jobOrders",
        isReadOnly: true,
      },
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
