import { useState, useRef } from "react";

import Button from "./Button";

const AddItemForm = ({ onAddItem }) => {
  const [itemText, setItemText] = useState("");
  const inputRef = useRef();

  //handlers
  const handleSubmit = e => {
    e.preventDefault();

    // basic validation (guard statement)
    if (!itemText) {
      alert("Item can't be empty");
      inputRef.current.focus();
      return;
    }

    // const newItem = {
    //   id: new Date().getTime(),
    //   name: itemText,
    //   packed: false
    // };
    // setItems(prev => [...prev, newItem]);
    onAddItem(itemText);
    setItemText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        value={itemText}
        onChange={e => {
          setItemText(e.target.value);
        }}
        autoFocus
      />
      <Button>Add to list</Button>
    </form>
  );
};

export default AddItemForm;
