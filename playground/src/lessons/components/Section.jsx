export default function Section({ title, children }) {
  return (
    <section
      style={{
        marginBottom: '3rem',
        padding: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '1rem',
        border: '1px solid #334155',
      }}
    >
      <h2
        style={{
          fontSize: '1.25rem',
          marginTop: 0,
          marginBottom: '1rem',
          color: '#f1f5f9',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
