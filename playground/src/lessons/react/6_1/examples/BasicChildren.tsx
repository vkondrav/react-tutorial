// @ts-nocheck
interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="card bg-base-200 p-4">
      {children} {/* Whatever you put between <Card>...</Card> */}
    </div>
  );
}

// Usage - children can be anything!
<Card>
  <h2>Title</h2>
  <p>Any content works here.</p>
</Card>;
