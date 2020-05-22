import ListConfig from "./ListConfig";
import { getDateString } from "../../utils";

export default {
  params: {
    apiRoute: "jobOrders",
    parentColumn: "jobId",
    listName: "Job Orders",
    listItemTypeName: "Job Order",
    fieldByWhichToSortList: "dateOrdered",
    queryParamsForGetByQuery: {
      attributes: "dateOrdered",
    },
    queryParamsForGetById: {
      attributes: "dateOrdered,jobId",
    },
    listItemLists: [
      { type: "notes" },
      { type: "vendorOrders" },
      { type: "installations" },
    ],
    itemDetailFields: [
      {
        columnName: "jobId",
        displayName: "Job",
        type: "queryDisplay",
        listType: "jobs",
      },
      { columnName: "dateOrdered", displayName: "Date Ordered", type: "date" },
    ],
    newItemFormFields: [
      {
        columnName: "jobId",
        displayName: "Job",
        type: "queryDisplay",
        listType: "jobs",
      },
      { columnName: "dateOrdered", displayName: "Date Ordered", type: "date" },
    ],
  },

  listConfig: class JobOrdersListConfig extends ListConfig {
    getListItemName({ dateOrdered }) {
      return {
        itemName:
          dateOrdered && `Job order ordered on ${getDateString(dateOrdered)}`,
      };
    }
  },
};
