import ListConfig from "./ListConfig";
import { getDateString } from "../../utils";

export default {
  params: {
    apiRoute: "vendorOrders",
    parentColumn: "jobOrderId",
    listName: "Vendor Orders",
    listItemTypeName: "Vendor Order",
    fieldByWhichToSortList: "dateOrdered",
    queryParamsForGetByQuery: {
      attributes: "vendor_name,dateOrdered,doesHaveReplacements",
    },
    queryParamsForGetById: {
      attributes:
        "vendor_name,poNum,trackingNum,dateOrdered,numberOfPieces,completed,doesHaveReplacements",
    },
    listItemLists: [
      {
        type: "notes",
      },
      {
        type: "vendorOrderReplacements",
        hookFuncs: {
          onDelete: "getItemDoesHaveReplacements",
          onAdd: "getItemDoesHaveReplacements",
        },
      },
    ],
    itemDetailFields: [
      { columnName: "poNum", displayName: "Invoice / PO #", type: "text" },
      { columnName: "trackingNum", displayName: "Tracking #", type: "text" },
      { columnName: "dateOrdered", type: "date" },
      {
        columnName: "numberOfPieces",
        displayName: "Number of Pieces",
        type: "text",
      },
      { columnName: "completed", type: "checkbox" },
    ],
    newItemFormFields: [
      {
        columnName: "vendorId",
        displayName: "Vendor Name",
        type: "dropdown-with-query",
        dropdownItemType: "vendors",
      },
      { columnName: "poNum", displayName: "Invoice/ PO #" },
      { columnName: "trackingNum", displayName: "Tracking #" },
      { columnName: "dateOrdered", displayName: "Date Ordered", type: "date" },
      { columnName: "numberOfPieces", displayName: "Number of Pieces" },
      { columnName: "completed", type: "checkbox" },
    ],
  },

  listConfig: class VendorOrdersListConfig extends ListConfig {
    getItemWarning(item) {
      if (item && item.doesHaveReplacements) {
        return { message: "NEEDS REPLACEMENTS", color: "yellow" };
      }
    }
    getListItemName({ vendor_name, dateOrdered }) {
      let itemName;
      if (vendor_name) {
        itemName = `${vendor_name} ordered`;
        if (dateOrdered) {
          itemName += ` on ${getDateString(dateOrdered)}`;
        }
      }
      return { itemName };
    }
    getItemDoesHaveReplacements(itemId, thisVal) {
      return async function () {
        const { data: item } = await thisVal.getById(itemId, {
          attributes: "doesHaveReplacements",
        });
        thisVal.mergeListItemToState(item);
      };
    }
  },
};
