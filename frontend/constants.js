import cloneDeep from "lodash.clonedeep";
import get from "lodash.get";
import merge from "lodash.merge";
import update from "lodash.update";
import { getDateString } from "../util/functions";

export const tableNameListType = {
  clients: "Companies",
  prospects: "Companies",
  vendors: "Companies",
  contacts: "People",
  jobs: "Jobs",
  jobOrders: "JobOrders",
  installations: "Installations",
  vendorOrders: "VendorOrders",
  vendorOrderReplacements: "VendorOrderReplacements",
  installers: "Installer",
};

export const parentColumnByItemType = {
  contacts: "companyId",
  jobs: "companyId",
  jobOrders: "jobId",
  installations: "jobOrderId",
  vendorOrders: "jobOrderId",
  notes: "parentId",
  vendorOrderReplacements: "vendorOrderId",
  installers: "installationId",
};

const createParentIdQuery = (type, parentId, statePath) => {
  if (type === "notes") {
    return {
      parentId: parentId,
      parentTable: tableNameListType[statePath[statePath.length - 3]],
    };
  }

  const parentColumn = parentColumnByItemType[type];
  return parentColumn && parentId ? { [parentColumn]: parentId } : {};
};

export const apiRouteByItemType = {
  companies: "companies",
  clients: "companies",
  prospects: "companies",
  contacts: "contacts",
  jobs: "jobs",
  jobOrders: "jobOrders",
  installations: "installations",
  vendorOrders: "vendorOrders",
  vendors: "companies",
  notes: "notes",
  vendorOrderReplacements: "vendorOrderReplacements",
  installers: "installers",
};

export const queryParamsByItemType = {
  companies: {
    columns: "name",
  },
  clients: {
    columns: "name",
    status: "client",
  },
  prospects: {
    columns: "name",
    status: "prospect",
  },
  contacts: { columns: "name" },
  jobs: { columns: "name" },
  jobOrders: { columns: "dateOrdered" },
  installations: { columns: "installationDate" },
  vendorOrders: { columns: "name,dateOrdered,doesHaveReplacements" },
  vendors: { columns: "name", status: "vendor" },
  notes: { columns: "contents,updatedAt" },
  vendorOrderReplacements: { columns: "itemNumber" },
  installers: { columns: "name" },
};

export const createListGetByQueryOptions = (type, parentId, statePath) => {
  return {
    route: apiRouteByItemType[type],
    queryParams: {
      ...queryParamsByItemType[type],
      ...createParentIdQuery(type, parentId, statePath),
    },
    statePath,
  };
};

const itemDetailsGetByIdQueryParams = {
  contacts: {
    columns: "name,phoneNum,email,position",
  },
  jobs: {
    columns:
      "name,poNum,status,budgetSentDate,imageProposalSentDate,artPlanSentDate,receivableStatus",
  },
  notes: { columns: "contents,authorName,updatedAt" },
  vendorOrderReplacements: { columns: "itemNumber,completed,updatedAt" },
  installers: { columns: "name" },
};

export const getItemWarningByItemType = {
  vendorOrders: (item) => {
    if (item && item.doesHaveReplacements) {
      return { message: "NEEDS REPLACEMENTS", color: "yellow" };
    }
  },
};

export const onAddOrRemoveByType = {
  vendorOrderReplacements: (statePath, storeContext) => {
    const parentType = statePath[statePath.length - 3];
    const parentId = statePath[statePath.length - 2];
    if (parentType && parentId) {
      storeContext.getById({
        route: apiRouteByItemType[parentType],
        id: parentId,
        queryParams: { columns: "doesHaveReplacements" },
        statePath: statePath.slice(0, statePath.length - 2),
      });
    }
  },
};

export const createItemDetailsGetByIdQueryOptions = (type, id, statePath) => {
  return {
    route: apiRouteByItemType[type],
    id,
    queryParams: itemDetailsGetByIdQueryParams[type] || {},
    statePath,
  };
};

export const listNameByItemType = {
  companies: "Companies",
  clients: "Clients",
  prospects: "Prospects",
  contacts: "Contacts",
  jobs: "Jobs",
  jobOrders: "Job Orders",
  installations: "Installations",
  vendorOrders: "Vendor Orders",
  vendors: "Vendors",
  notes: "Notes",
  vendorOrderReplacements: "Replacements",
  installers: "Installers",
};

const defaultSortFieldByItemType = {
  jobOrders: "dateOrdered",
  installations: "installationDate",
  notes: "updatedAt",
  vendorOrderReplacements: "updatedAt",
};

export const getDefaultListSortFuncByItemType = (type) => {
  const sortField = defaultSortFieldByItemType[type] || "name";
  return (a, b) => {
    if (a[sortField] < b[sortField]) {
      return -1;
    }
    if (a[sortField] > b[sortField]) {
      return 1;
    }
    return 0;
  };
};

export const getItemNameFuncByItemType = {
  companies: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  clients: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  prospects: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  contacts: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  jobs: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  jobOrders: ({ dateOrdered }) => ({
    itemName:
      dateOrdered && `Job order ordered on ${getDateString(dateOrdered)}`,
  }),
  installations: ({ installationDate }) => ({
    itemName:
      installationDate &&
      `Installation set for ${getDateString(installationDate)}`,
  }),
  vendorOrders: ({ name: vendorName, dateOrdered }) => {
    let itemName;
    if (vendorName) {
      itemName = `${vendorName} ordered`;
      if (dateOrdered) {
        itemName += ` on ${getDateString(dateOrdered)}`;
      }
    }
    return { itemName };
  },
  vendors: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  notes: (item) => {
    let itemName = item.contents || "";
    itemName = itemName.replace("\n", "...");
    if (itemName.length > 44) {
      itemName = `${itemName.slice(0, 44)}... (see more)`;
    }
    return {
      itemName,
    };
  },
  vendorOrderReplacements: ({ itemNumber }) => ({
    itemName: `Item number ${itemNumber}`,
  }),
  installers: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
};

const jobStatusDisplayNameByType = {
  inProgress: "In Progress",
  onHold: "On Hold",
  completed: "Completed",
};

export const itemListsByItemType = {
  clients: [{ type: "contacts" }, { type: "notes" }, { type: "jobs" }],
  prospects: [{ type: "contacts" }, { type: "notes" }, { type: "jobs" }],
  jobs: [{ type: "notes" }, { type: "jobOrders" }],
  jobOrders: [
    { type: "notes" },
    { type: "vendorOrders" },
    { type: "installations" },
  ],
  vendorOrders: [{ type: "notes" }, { type: "vendorOrderReplacements" }],
  vendorOrderReplacements: [{ type: "notes" }],
  installations: [{ type: "installers" }],
};

export const itemDetailFieldsByItemType = {
  clients: [
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
  ],
  prospects: [
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
  ],
  contacts: [
    { columnName: "name", type: "text" },
    { columnName: "phoneNum", displayName: "Phone Number", type: "text" },
    { columnName: "email", type: "text" },
    { columnName: "position", type: "text" },
  ],
  jobs: [
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
  jobOrders: [
    { columnName: "dateOrdered", displayName: "Date Ordered", type: "date" },
  ],
  installations: [
    {
      columnName: "installationDate",
      displayName: "Install Date",
      type: "date",
    },
    { columnName: "completed", type: "checkbox" },
  ],
  vendorOrders: [
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
  notes: [
    {
      columnName: "authorName",
      displayName: "Author",
      type: "text",
      isReadOnly: true,
    },
    {
      columnName: "updatedAt",
      displayName: "Last Updated",
      type: "date",
      isReadOnly: true,
    },
    { columnName: "contents", type: "text-box" },
  ],
  vendorOrderReplacements: [
    { columnName: "itemNumber", displayName: "Item Number" },
    { columnName: "completed", type: "checkbox" },
  ],
  installers: [],
};

export const itemNameByItemType = {
  companies: "Company",
  clients: "Company",
  prospects: "Company",
  contact: "Contact",
  jobs: "Job",
  jobOrders: "Job Order",
  installations: "Installation",
  vendorOrders: "Vendor Order",
  vendors: "Vendor",
  notes: "Note",
  vendorOrderReplacements: "Replacement",
  installers: "Installer",
};

export const newItemFormFieldsByItemType = {
  companies: [
    { columnName: "name" },
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
    { columnName: "notes" },
  ],
  clients: [
    { columnName: "name" },
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
    { columnName: "notes" },
  ],
  prospects: [
    { columnName: "name" },
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
    { columnName: "notes" },
  ],
  contacts: [
    { columnName: "name" },
    { columnName: "phoneNum", displayName: "Phone Number" },
    { columnName: "email" },
    { columnName: "position" },
  ],
  jobs: [
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
  jobOrders: [
    { columnName: "dateOrdered", displayName: "Date Ordered", type: "date" },
    { columnName: "notes" },
  ],
  installations: [
    {
      columnName: "installationDate",
      displayName: "Install Date",
      type: "date",
    },
    { columnName: "completed", type: "checkbox" },
  ],
  vendorOrders: [
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
    { columnName: "notes" },
  ],
  vendors: [{ columnName: "name" }, { columnName: "notes" }],
  notes: [{ columnName: "contents" }],
  vendorOrderReplacements: [
    { columnName: "itemNumber", displayName: "Item Number" },
    { columnName: "completed", type: "checkbox" },
    { columnName: "notes" },
  ],
  installers: [{ columnName: "name" }],
};

export const getNewItemRecordBase = ({
  type,
  parentId,
  parentType,
  userId,
  hasNotes,
}) => {
  const baseRecord = {};
  if (parentId) {
    baseRecord[parentColumnByItemType[type]] = parentId;
  }

  if (type === "notes" || hasNotes) {
    baseRecord.author = userId;
  }
  if (type === "notes" && parentId && parentType) {
    baseRecord.parentTable = tableNameListType[parentType];
  }
  if (type === "vendors") {
    baseRecord.status = "vendor";
  }
  if (type === "jobs") {
    baseRecord.status = "inProgress";
  }

  return baseRecord;
};
