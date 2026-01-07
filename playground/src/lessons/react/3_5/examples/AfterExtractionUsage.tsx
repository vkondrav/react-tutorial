// @ts-nocheck
function MyComponent(): React.ReactElement {
  const { width, height } = useWindowSize();
  return <div>Width: {width}</div>;
}

// Reuse anywhere!
function AnotherComponent(): React.ReactElement {
  const { width } = useWindowSize();
  return width < 768 ? <MobileNav /> : <DesktopNav />;
}
