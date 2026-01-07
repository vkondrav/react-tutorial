// @ts-nocheck
// 1. Create the context type
interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

// 2. Create context with null default
const AccordionContext = createContext<AccordionContextType | null>(null);

// 3. Create a safe hook with error handling
function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within <Accordion>');
  }
  return context;
}
