// @ts-nocheck
// Server Component: Direct data fetching
async function ProductPage({ productId }) {
  // Fetch directly in the component!
  const product = await db.products.findUnique({
    where: { id: productId },
    include: { reviews: true },
  });

  // Or use fetch with automatic caching
  const recommendations = await fetch(
    `${API_URL}/recommendations/${productId}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  ).then((r) => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <ReviewList reviews={product.reviews} />
      <Recommendations items={recommendations} />

      {/* Only this button needs client JS */}
      <AddToCartButton productId={productId} />
    </div>
  );
}
