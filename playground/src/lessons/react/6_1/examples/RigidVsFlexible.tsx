// @ts-nocheck
// ❌ Without slots - rigid, one-size-fits-all
function RigidCard({ title, text }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

// ✅ With slots - flexible, customizable
function FlexibleCard({ header, footer, children }) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
