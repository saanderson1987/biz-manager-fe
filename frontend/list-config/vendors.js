import ListConfig from "./ListConfig";
import companies from "./companies";

export default {
  ...companies,
  params: {
    ...companies.params,
    listName: "Vendors",
    listItemTypeName: "Vendor",
    queryParamsForGetByQuery: {
      status: "vendor",
    },
    newItemFormFields: [{ columnName: "name" }],
  },
  listConfig: class VendorListConfig extends ListConfig {
    addNewItemBaseRecord(newRecord) {
      return { ...super.addNewItemBaseRecord(newRecord), status: "vendor" };
    }
  },
};
