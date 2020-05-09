import ListConfig from "./ListConfig";
import { tableNameByListType } from "./index";

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
      const baseRecord = {};
      const parentType = this.statePath[this.statePath.length - 3];
      if (this.parentId && parentType) {
        baseRecord.parentTable = tableNameByListType[parentType];
      }
      baseRecord.authorId = userId;
      return { ...super.addNewItemBaseRecord(newRecord), ...baseRecord };
    }

    addParentIdParam(queryParams) {
      return {
        ...super.addParentIdParam(queryParams),
        parentTable: tableNameByListType[this.parentType],
      };
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
