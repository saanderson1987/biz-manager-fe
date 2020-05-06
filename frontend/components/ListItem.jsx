import React, { useContext, useState } from "react";
import classNames from "classnames";
import { ListContext } from "../contexts/ListContext";
import ListItemHeader from "./ListItemHeader";
import ItemDetails from "./ItemDetails";
import List from "./List";
import DeleteWarning from "./DeleteWarning";

const ListItem = ({ item, isFirst }) => {
  const {
    updateListItem,
    deleteListItem,
    getListItemName,
    getItemWarning,
    listItemLists,
    statePath,
    createHooks,
  } = useContext(ListContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteWarningVisible, setIsDeleteWarningVisible] = useState(false);

  const { itemName, itemNameColumnName } = getListItemName(item);

  return (
    <div className={classNames("list-item", { "list-item--first": isFirst })}>
      <ListItemHeader
        itemName={itemName}
        isExpanded={isExpanded}
        toggleExpanded={() => setIsExpanded(!isExpanded)}
        isEditable={!!itemNameColumnName}
        warning={getItemWarning(item)}
        update={(newValue) =>
          updateListItem({
            id: item.id,
            record: { [itemNameColumnName]: newValue },
          })
        }
        onClickDelete={() => setIsDeleteWarningVisible(true)}
      />
      {isExpanded && (
        <>
          <ItemDetails itemId={item.id} />
          {listItemLists.map((list, i) => (
            <List
              type={list.type}
              statePath={[...statePath, item.id, list.type]}
              hooks={createHooks(item.id)}
              key={i}
            />
          ))}
        </>
      )}
      {isDeleteWarningVisible && (
        <DeleteWarning
          itemName={itemName}
          closeModal={() => setIsDeleteWarningVisible(false)}
          deleteItem={() => deleteListItem(item.id)}
        />
      )}
    </div>
  );
};

export default ListItem;
