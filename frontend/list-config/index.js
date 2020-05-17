import clients from "./clients";
import clientsAndProspects from "./clientsAndProspects";
import companies from "./companies";
import contacts from "./contacts";
import installations from "./installations";
import installers from "./installers";
import jobOrders from "./jobOrders";
import jobs from "./jobs";
import notes from "./notes";
import prospects from "./prospects";
import receivables from "./receivables";
import vendorOrderReplacements from "./vendorOrderReplacements";
import vendorOrders from "./vendorOrders";
import vendors from "./vendors";

const listConfigs = {
  clients,
  clientsAndProspects,
  companies,
  contacts,
  installations,
  installers,
  jobOrders,
  jobs,
  notes,
  prospects,
  receivables,
  vendorOrderReplacements,
  vendorOrders,
  vendors,
};

export const createListConfig = ({
  listType,
  statePath,
  hooks,
  dispatchToListDataStore,
}) =>
  new listConfigs[listType].listConfig({
    statePath,
    hooks,
    dispatchToListDataStore,
    ...listConfigs[listType].params,
  });

export const tableNameByListType = {
  clients: "Companies",
  clientsAndProspects: "Companies",
  contacts: "People",
  companies: "Companies",
  prospects: "Companies",
  installations: "Installations",
  installers: "Installer",
  jobs: "Jobs",
  jobOrders: "JobOrders",
  receivables: "Jobs",
  vendorOrderReplacements: "VendorOrderReplacements",
  vendorOrders: "VendorOrders",
  vendors: "Companies",
};
