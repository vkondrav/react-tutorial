// @ts-nocheck
// Problem: Siblings can't share state!
function ProductList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', inCart: false },
    { id: 2, name: 'Phone', inCart: false },
  ]);
  // items state is trapped here!
  return <div>{/* render products */}</div>;
}

function CartSummary() {
  // ❌ Can't access items from ProductList!
  // How do we know what's in the cart?
  return <div>Cart: ??? items</div>;
}

function App() {
  return (
    <div>
      <ProductList />
      <CartSummary /> {/* No way to get cart data! */}
    </div>
  );
}
