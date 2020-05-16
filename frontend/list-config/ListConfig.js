import axios from "axios";

axios.defaults.withCredentials = true;

const baseUrl = process.env.API_HOST;

export default class ListConfig {
  constructor({
    statePath,
    dispatchToListDataStore,
    apiRoute,
    parentColumn,
    hooks,
    queryParamsForGetByQuery,
    queryParamsForGetById,
    listName,
    listItemLists,
    itemDetailFields,
    listItemTypeName,
    newItemFormFields,
  }) {
    this.statePath = statePath;
    this.dispatchToListDataStore = dispatchToListDataStore;
    this.apiRoute = apiRoute;
    this.queryParamsForGetByQuery = queryParamsForGetByQuery;
    this.queryParamsForGetById = queryParamsForGetById;
    this.hooks = hooks || {};
    // List comp
    this.listName = listName;
    // ListItem comp
    this.listItemLists = listItemLists || [];
    this.fieldByWhichToSortList || "name";
    // ItemDetails comp
    this.itemDetailFields = itemDetailFields || [];
    // NewItemForm comp
    this.listItemTypeName = listItemTypeName;
    this.newItemFormFields = newItemFormFields || [];
    // parent values
    this.parentColumn = parentColumn;
    this.parentId = statePath[statePath.length - 2];
    this.parentType = statePath[statePath.length - 3];

    this.mergeListItemsToState = this.mergeListItemsToState.bind(this);
    this.mergeListItemToState = this.mergeListItemToState.bind(this);
    this.removeListItemFromState = this.removeListItemFromState.bind(this);
    this.createListItem = this.createListItem.bind(this);
    this.getListItems = this.getListItems.bind(this);
    this.getListItemById = this.getListItemById.bind(this);
    this.updateListItem = this.updateListItem.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.getListItemName = this.getListItemName.bind(this);
    this.getItemWarning = this.getItemWarning.bind(this);
    this.defaultSortListFunc = this.defaultSortListFunc.bind(this);
    this.addNewItemBaseRecord = this.addNewItemBaseRecord.bind(this);
    this.addParentIdParam = this.addParentIdParam.bind(this);
    this.createHooks = this.createHooks.bind(this);
  }

  // dbApiFunctions
  createRecord(newRecord, queryParams) {
    return axios.post(baseUrl + this.apiRoute, newRecord, {
      params: queryParams,
    });
  }
  getByQuery(queryParams) {
    return axios.get(baseUrl + this.apiRoute, { params: queryParams });
  }
  getById(id, queryParams) {
    return axios.get(baseUrl + this.apiRoute + "/" + id, {
      params: queryParams,
    });
  }
  updateRecord({ id, record, queryParams }) {
    return axios.put(baseUrl + this.apiRoute + "/" + id, record, {
      params: queryParams,
    });
  }
  deleteRecord(id) {
    return axios.delete(baseUrl + this.apiRoute + "/" + id);
  }

  // stateUpdateFunctions
  mergeListItemsToState(itemsById) {
    this.dispatchToListDataStore({
      type: "mergeListItems",
      statePath: this.statePath,
      data: itemsById,
    });
  }
  mergeListItemToState(item) {
    this.dispatchToListDataStore({
      type: "mergeListItem",
      statePath: this.statePath,
      data: item,
    });
  }
  removeListItemFromState(itemId) {
    this.dispatchToListDataStore({
      type: "removeListItem",
      statePath: this.statePath,
      data: itemId,
    });
  }

  // dataQueryFunctions
  async createListItem(newRecord) {
    try {
      const { data: newItem } = await this.createRecord(
        newRecord,
        this.queryParamsForGetById
      );
      this.mergeListItemToState(newItem);
      if (this.hooks.onAdd) {
        this.hooks.onAdd();
      }
    } catch (e) {
      this.dispatchToListDataStore({ type: "logError", data: e.toString() });
    }
  }
  async getListItems() {
    try {
      const { data: itemsById } = await this.getByQuery(
        this.addParentIdParam(this.queryParamsForGetByQuery)
      );
      this.mergeListItemsToState(itemsById);
    } catch (e) {
      this.dispatchToListDataStore({ type: "logError", data: e.toString() });
    }
  }
  async getListItemById(id) {
    try {
      const { data: item } = await this.getById(id, this.queryParamsForGetById);
      this.mergeListItemToState(item);
    } catch (e) {
      this.dispatchToListDataStore({ type: "logError", data: e.toString() });
    }
  }
  async updateListItem({ id, record }) {
    try {
      const { data: updatedItem } = await this.updateRecord({
        id,
        record,
        queryParams: { attributes: Object.keys(record).join(",") },
      });
      this.mergeListItemToState(updatedItem);
    } catch (e) {
      this.dispatchToListDataStore({ type: "logError", data: e.toString() });
    }
  }
  async deleteListItem(id) {
    try {
      const { data: deletedItem } = await this.deleteRecord(id);
      this.removeListItemFromState(deletedItem.id);
      if (this.hooks.onDelete) {
        this.hooks.onDelete();
      }
    } catch (e) {
      this.dispatchToListDataStore({ type: "logError", data: e.toString() });
    }
  }
  //

  // List comp
  defaultSortListFunc(a, b) {
    const sortField = this.fieldByWhichToSortList;
    if (a[sortField] < b[sortField]) {
      return -1;
    }
    if (a[sortField] > b[sortField]) {
      return 1;
    }
    return 0;
  }

  // ListItem comp
  getListItemName(item) {
    return item
      ? {
          itemName: item.name,
          itemNameColumnName: "name",
        }
      : {};
  }
  getItemWarning(item) {}

  // NewItemForm comp
  addNewItemBaseRecord(newRecord) {
    const baseRecord = {};
    if (this.parentColumn && this.parentId) {
      baseRecord[this.parentColumn] = this.parentId;
    }
    return { ...baseRecord, ...newRecord };
  }

  // utils
  addParentIdParam(queryParams) {
    if (this.parentColumn && this.parentId) {
      return { ...queryParams, [this.parentColumn]: this.parentId };
    }
    return queryParams;
  }
  createHooks(hookFuncs, itemId) {
    // inject itemId
    if (hookFuncs) {
      return Object.entries(hookFuncs).reduce((acc, [key, value]) => {
        acc[key] = this[value](itemId, this);
        return acc;
      }, {});
    }
  }
}
