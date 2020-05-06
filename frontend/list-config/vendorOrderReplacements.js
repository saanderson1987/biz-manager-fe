import ListConfig from "./ListConfig";

export default {
  params: {
    apiRoute: "vendorOrderReplacements",
    parentColumn: "vendorOrderId",
    listName: "Replacements",
    listItemTypeName: "Replacement",
    fieldByWhichToSortList: "updatedAt",
    queryParamsForGetByQuery: {
      attributes: "itemNumber",
    },
    queryParamsForGetById: {
      attributes: "itemNumber,completed,updatedAt",
    },
    listItemLists: [{ type: "notes" }],
    itemDetailFields: [
      { columnName: "itemNumber", displayName: "Item Number" },
      { columnName: "completed", type: "checkbox" },
    ],
    newItemFormFields: [
      { columnName: "itemNumber", displayName: "Item Number" },
      { columnName: "completed", type: "checkbox" },
      { columnName: "notes" },
    ],
  },

  listConfig: class VendorOrderReplacementsListConfig extends ListConfig {
    getListItemName({ itemNumber }) {
      return {
        itemName: `Item number ${itemNumber}`,
      };
    }
  },
};
