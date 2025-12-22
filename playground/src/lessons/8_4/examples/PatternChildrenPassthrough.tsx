// @ts-nocheck
// Client Component: Wrapper with state
'use client';
function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▼' : '▶'}
      </button>
      {isOpen && (
        <div className="content">
          {children} {/* Server content rendered here */}
        </div>
      )}
    </div>
  );
}

// Server Component: Uses the client wrapper
async function ProductPage() {
  const specs = await getProductSpecs(); // Server-side fetch

  return (
    <div>
      <h1>Product</h1>

      {/* Server content inside Client wrapper */}
      <Accordion title="Technical Specs">
        <SpecsTable specs={specs} /> {/* Server Component! */}
      </Accordion>
    </div>
  );
}

// SpecsTable is a Server Component
// Its HTML is pre-rendered and passed as children
// No server code in client bundle!
