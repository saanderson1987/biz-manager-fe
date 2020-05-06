import ListConfig from "./ListConfig";
import companies from "./companies";
import merge from "lodash.merge";

export default merge({}, companies, {
  params: {
    listName: "Vendors",
    listItemTypeName: "Vendor",
    queryParamsForGetByQuery: {
      status: "vendor",
    },
    newItemFormFields: [{ columnName: "name" }, { columnName: "notes" }],
  },
  listConfig: class VendorListConfig extends ListConfig {
    addNewItemBaseRecord(newRecord) {
      return { ...super.addNewItemBaseRecord(newRecord), status: "vendor" };
    }
  },
});
