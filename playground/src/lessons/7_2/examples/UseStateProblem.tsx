// @ts-nocheck
// Problem: Complex state with useState becomes messy
function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Adding an item requires updating multiple states
  const addItem = (product: Product) => {
    setItems([...items, product]);
    setTotal(total + product.price);
    // What if we forget to update something?
    // What if the logic depends on previous state?
  };

  // Removing is even more complex...
  const removeItem = (id: number) => {
    const item = items.find((i) => i.id === id);
    setItems(items.filter((i) => i.id !== id));
    setTotal(total - item.price);
    // Recalculate discount? Shipping?
    // Easy to introduce bugs!
  };

  // Applying a discount touches multiple values
  const applyDiscount = (code: string) => {
    setIsLoading(true);
    // fetch discount...
    setDiscount(calculatedDiscount);
    setTotal(/* recalculate */);
    setIsLoading(false);
  };
}
