import clients from "./clients";
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
  dispatchToListDataStore,
}) =>
  new listConfigs[listType].listConfig({
    statePath,
    dispatchToListDataStore,
    ...listConfigs[listType].params,
  });
