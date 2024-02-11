import { useState, useEffect, createContext } from "react";
import { initialItems } from "../lib/constants";

export const ItemsContext = createContext();

const ItemsContextProvider = ({ children }) => {
  // const itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
  //if the first argument of || is null or undefined (falsy), it will return the second argument
  //if the first argument of || is not null or undefined (truthy), it will return the first argument

  //if we use an arrow function inside useState it will only run once
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("items")) || initialItems
  );

  const handleAddItem = newItemText => {
    //create the new item
    const newItem = {
      id: new Date().getTime(),
      name: newItemText,
      packed: false
    };

    const newItems = [...items, newItem];

    setItems(newItems);
  };

  const handleDeleteItem = id => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  };

  const handleToggleItem = id => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return { ...item, packed: !item.packed };
      }
      return item;
    });

    setItems(newItems);
  };

  const handleRemoveAllItems = () => {
    setItems([]);
  };

  const handleResetToInitial = () => {
    setItems(initialItems);
  };

  const handleMarkAllAsComplete = () => {
    const newItems = items.map(item => ({ ...item, packed: true }));
    setItems(newItems);
  };

  const handleMarkAllAsIncomplete = () => {
    const newItems = items.map(item => ({ ...item, packed: false }));
    setItems(newItems);
  };

  //calculate the total number of items
  // const totalNumberOfItems = items.length;
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleDeleteItem,
        handleToggleItem,
        handleRemoveAllItems,
        handleResetToInitial,
        handleMarkAllAsComplete,
        handleMarkAllAsIncomplete
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContextProvider;
