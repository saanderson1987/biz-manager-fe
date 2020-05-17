import jobs from "./jobs";

export default {
  ...jobs,
  params: {
    ...jobs.params,
    listName: "Receivables",
    queryParamsForGetByQuery: {
      attributes: "name,receivableStatus",
    },
  },
  listConfig: class ReceivableListConfig extends jobs.listConfig {
    // getListItemName(item) {
    //   return {
    //     itemName: item.person_name,
    //     itemNameColumnName: "person_name",
    //   };
    // }
  },
};
