import { useItemsContext } from "../lib/hooks";
import Counter from "./Counter";
import Logo from "./Logo";

const Header = () => {
  //get what we want from the context
  const { items } = useItemsContext();

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
