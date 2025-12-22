interface SectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps): React.ReactElement {
  return (
    <section className="mb-12 card bg-base-200 p-6 border border-base-300">
      <h2 className="text-xl mt-0 mb-4 text-base-content">{title}</h2>
      {children}
    </section>
  );
}
