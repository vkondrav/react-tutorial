// @ts-nocheck
// Server Component (parent)
async function ProductPage({ id }) {
  const product = await db.find(id);

  return (
    <div>
      {/* Server Component child */}
      <ProductDetails product={product} />

      {/* Client Components for interactivity */}
      <AddToCart productId={id} />
      <ImageGallery images={product.images} />
    </div>
  );
}

// Client Component (marked with directive)
('use client');
function AddToCart({ productId }) {
  const [qty, setQty] = useState(1);
  return <button onClick={() => setQty(qty + 1)}>Add {qty}</button>;
}
