// @ts-nocheck
// Solution: Lift state to the common parent!
function App() {
  // ✅ State lives in the parent
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', inCart: false },
    { id: 2, name: 'Phone', inCart: false },
  ]);

  const toggleCart = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, inCart: !item.inCart } : item)));
  };

  const cartItems = items.filter((item) => item.inCart);

  return (
    <div>
      {/* Pass state down as props */}
      <ProductList items={items} onToggle={toggleCart} />
      <CartSummary items={cartItems} />
    </div>
  );
}

// Children receive state via props
function ProductList({ items, onToggle }) {
  return (
    <div>
      {items.map((item) => (
        <button key={item.id} onClick={() => onToggle(item.id)}>
          {item.name} {item.inCart ? '✓' : '+'}
        </button>
      ))}
    </div>
  );
}

function CartSummary({ items }) {
  return <div>Cart: {items.length} items</div>;
}
