import { useState, useMemo } from "react";
import Select from "react-select";
import EmptyView from "./EmptyView";
import Item from "./Item";
import { useItemsStore } from "../stores/itemsStore";

const sortingOptions = [
  {
    label: "Sort by default",
    value: "default"
  },
  {
    label: "Sort by packed",
    value: "packed"
  },
  {
    label: "Sort by unpacked",
    value: "unpacked"
  }
];

const ItemList = () => {
  const [sortBy, setSortBy] = useState("default");

  //get what we want from the zustand Items store
  const items = useItemsStore(state => state.items);
  const deleteItem = useItemsStore(state => state.deleteItem);
  const toggleItem = useItemsStore(state => state.toggleItem);

  // Preserve the original array because sort is not returning a new array like map or filter
  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "packed") {
          return b.packed - a.packed;
        }
        if (sortBy === "unpacked") {
          return a.packed - b.packed;
        }
        return;
      }),
    [items, sortBy]
  );

  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}

      {items.length > 0 ? (
        <section className="sorting">
          <Select
            onChange={option => setSortBy(option.value)}
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
          />
        </section>
      ) : null}

      {sortedItems.map(item => (
        <Item
          item={item}
          key={item.id}
          onDeleteItem={deleteItem}
          onToggleItem={toggleItem}
        />
      ))}
    </ul>
  );
};

export default ItemList;
