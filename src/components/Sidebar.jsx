import { useItemsContext } from "../lib/hooks";
import AddItemForm from "./AddItemForm";
import ButtonGroup from "./ButtonGroup";

const Sidebar = () => {
  const { handleAddItem } = useItemsContext();

  console.log("Sidebar rendering...");

  return (
    <div className="sidebar">
      <AddItemForm onAddItem={handleAddItem} />

      <ButtonGroup />
    </div>
  );
};

export default Sidebar;
