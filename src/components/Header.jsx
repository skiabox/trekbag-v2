import { useItemsStore } from "../stores/itemsStore";
import Counter from "./Counter";
import Logo from "./Logo";

const Header = () => {
  //get what we want from the zustand Items store
  const items = useItemsStore(state => state.items);

  return (
    <header>
      <Logo />
      <Counter
        numberOfItemsPacked={items.filter(item => item.packed).length}
        totalNumberOfItems={items.length}
      />
    </header>
  );
};

export default Header;
