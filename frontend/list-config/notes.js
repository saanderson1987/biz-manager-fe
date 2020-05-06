import ListConfig from "./ListConfig";

export default {
  params: {
    apiRoute: "notes",
    parentColumn: "parentId",
    listName: "Notes",
    listItemTypeName: "Note",
    fieldByWhichToSortList: "updatedAt",
    queryParamsForGetByQuery: {
      attributes: "contents,updatedAt",
    },
    queryParamsForGetById: {
      attributes: "contents,author_name,updatedAt",
    },
    itemDetailFields: [
      {
        columnName: "author_name",
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
    newItemFormFields: [{ columnName: "contents" }],
  },

  listConfig: class NotesListConfig extends ListConfig {
    addNewItemBaseRecord(newRecord, userId) {
      throw new Error("need to add author = userId ");
      const baseRecord = {};
      const parentType = this.statePath[this.statePath.length - 3];
      if (this.parentId && parentType) {
        baseRecord.parentTable = tableNameByListType[parentType];
      }
      return { ...super.addNewItemBaseRecord(newRecord), status: "vendor" };
    }
    getListItemName(item) {
      let itemName = item.contents || "";
      itemName = itemName.replace("\n", "...");
      if (itemName.length > 44) {
        itemName = `${itemName.slice(0, 44)}... (see more)`;
      }
      return {
        itemName,
      };
    }
  },
};
