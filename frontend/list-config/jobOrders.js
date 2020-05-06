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
      attributes: "dateOrdered",
    },
    listItemLists: [
      { type: "notes" },
      { type: "vendorOrders" },
      { type: "installations" },
    ],
    itemDetailFields: [
      { columnName: "dateOrdered", displayName: "Date Ordered", type: "date" },
    ],
    newItemFormFields: [
      { columnName: "dateOrdered", displayName: "Date Ordered", type: "date" },
      { columnName: "notes" },
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
