// @ts-nocheck
// Server Component (default in RSC)
// No "use client" = runs on server

// Can use async/await directly!
async function ProductPage({ id }) {
  // Direct database access
  const product = await db.products.find(id);

  // Read files on server
  const readme = await fs.readFile('./README.md');

  // Use API keys safely
  const data = await fetch(API_URL, {
    headers: { 'API-Key': process.env.SECRET_KEY },
  });

  return (
    <article>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* This component's JS is NOT sent to browser */}
    </article>
  );
}
