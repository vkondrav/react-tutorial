// @ts-nocheck
// Shimmer with pulse animation
function Shimmer({ className }) {
  return (
    <div
      className={`bg-base-content/10 
      rounded animate-pulse ${className}`}
    />
  );
}

// The animate-pulse class creates
// a subtle fade in/out effect
