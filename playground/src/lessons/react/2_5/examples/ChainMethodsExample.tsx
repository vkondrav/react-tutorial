// @ts-nocheck
const filteredProducts = products
  .filter((p) => p.name.includes(searchTerm))
  .filter((p) => category === 'all' || p.category === category)
  .filter((p) => stockFilter === 'all' || p.inStock === inStock)
  .sort((a, b) => a.price - b.price)
  .map((product) => <ProductCard key={product.id} {...product} />);
