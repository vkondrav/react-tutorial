// @ts-nocheck
function Form() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ← Prevents page refresh
    // Handle form submission
  };
  return <form onSubmit={handleSubmit}>...</form>;
}
