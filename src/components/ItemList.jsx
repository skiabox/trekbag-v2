import { useState, useMemo } from "react";
import Select from "react-select";
import EmptyView from "./EmptyView";
import Item from "./Item";
import { useItemsContext } from "../lib/hooks";

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

  //get what we want from the context
  const { items, handleDeleteItem, handleToggleItem } = useItemsContext();

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
          onDeleteItem={handleDeleteItem}
          onToggleItem={handleToggleItem}
        />
      ))}
    </ul>
  );
};

export default ItemList;
