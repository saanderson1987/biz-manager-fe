import ListConfig from "./ListConfig";

const jobStatusDisplayNameByType = {
  inProgress: "In Progress",
  onHold: "On Hold",
  completed: "Completed",
};

export default {
  params: {
    apiRoute: "jobs",
    parentColumn: "companyId",
    listName: "Jobs",
    listItemTypeName: "Job",
    queryParamsForGetByQuery: {
      attributes: "name",
    },
    queryParamsForGetById: {
      attributes:
        "name,poNum,status,budgetSentDate,imageProposalSentDate,artPlanSentDate,receivableStatus,companyId",
    },
    listItemLists: [{ type: "notes" }, { type: "jobOrders" }],
    itemDetailFields: [
      {
        columnName: "companyId",
        displayName: "Company",
        type: "queryDisplay",
        listType: "clientsAndProspects",
      },
      { columnName: "poNum", displayName: "PO #", type: "text" },
      {
        columnName: "status",
        type: "dropdown",
        getDisplayValue: (value) => jobStatusDisplayNameByType[value],
        valueOptions: [
          {
            value: "inProgress",
            displayName: jobStatusDisplayNameByType.inProgress,
          },
          { value: "onHold", displayName: jobStatusDisplayNameByType.onHold },
          {
            value: "completed",
            displayName: jobStatusDisplayNameByType.completed,
          },
        ],
      },
      {
        columnName: "receivableStatus",
        displayName: "Receivable Status",
        type: "dropdown",
        valueOptions: [
          { value: null, displayName: "" },
          {
            value: "PO sent",
          },
          { value: "50% paid" },
          {
            value: "100% paid",
          },
        ],
      },
      {
        columnName: "budgetSentDate",
        displayName: "Budget Sent Date",
        type: "date",
      },
      {
        columnName: "imageProposalSentDate",
        displayName: "Image Proposal Sent Date",
        type: "date",
      },
      {
        columnName: "artPlanSentDate",
        displayName: "Art Plan Sent Date",
        type: "date",
      },
    ],
    newItemFormFields: [
      { columnName: "name" },
      { columnName: "poNum", displayName: "PO #" },
      {
        columnName: "receivableStatus",
        type: "dropdown",
        valueOptions: [
          {
            value: "PO sent",
          },
          { value: "50% paid" },
          {
            value: "100% paid",
          },
        ],
      },
    ],
  },

  listConfig: class JobListConfig extends ListConfig {
    addNewItemBaseRecord(newRecord) {
      return { ...super.addNewItemBaseRecord(newRecord), status: "inProgress" };
    }
  },
};
