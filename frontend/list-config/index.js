import clients from "./clients";
import clientsAndProspects from "./clientsAndProspects";
import contacts from "./contacts";
import installations from "./installations";
import installers from "./installers";
import jobOrders from "./jobOrders";
import jobs from "./jobs";
import notes from "./notes";
import prospects from "./prospects";
import vendorOrderReplacements from "./vendorOrderReplacements";
import vendorOrders from "./vendorOrders";
import vendors from "./vendors";

const listConfigs = {
  clients,
  clientsAndProspects,
  contacts,
  installations,
  installers,
  jobOrders,
  jobs,
  notes,
  prospects,
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
