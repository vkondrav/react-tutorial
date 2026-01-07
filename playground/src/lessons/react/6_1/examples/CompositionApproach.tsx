// @ts-nocheck
// ✅ Composition approach (React way)
function Dialog({ children }: { children: React.ReactNode }) {
  return <div className="dialog">{children}</div>;
}

<>
  // Use it by composing:
  <Dialog>
    <h1>Welcome!</h1>
  </Dialog>
  <Dialog>
    <h1>Warning!</h1>
  </Dialog>
</>;
