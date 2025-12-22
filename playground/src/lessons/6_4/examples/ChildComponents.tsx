// @ts-nocheck
// Children consume context - no props needed!
function AccordionTrigger({ id, children }: Props) {
  // Context gives us everything we need
  const { openItems, toggleItem } = useAccordionContext();
  const isOpen = openItems.has(id);

  return (
    <button onClick={() => toggleItem(id)}>
      {children}
      {isOpen ? <ChevronDown /> : <ChevronRight />}
    </button>
  );
}

function AccordionContent({ id, children }: Props) {
  const { openItems } = useAccordionContext();

  // Only render if this item is open
  if (!openItems.has(id)) return null;
  return <div>{children}</div>;
}
