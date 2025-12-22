// @ts-nocheck
// What Activity does:
<>
  {/* 1. mode="visible" - Component renders normally */}
  <Activity mode="visible">
    <ExpensiveComponent /> {/* Visible, effects running */}
  </Activity>

  {/* 2. mode="hidden" - Component is preserved but hidden */}
  <Activity mode="hidden">
    <ExpensiveComponent />
    {/* 
      - State preserved ✓
      - Removed from DOM (not just CSS hidden) ✓
      - Effects paused ✓
      - Refs cleared ✓
    */}
  </Activity>
</>;
