// @ts-nocheck
// ❌ Traditional approach: config object
<Tabs
  tabs={[
    { id: 'home', label: 'Home', content: <HomePanel /> },
    { id: 'profile', label: 'Profile', content: <ProfilePanel /> },
    { id: 'settings', label: 'Settings', content: <SettingsPanel />, disabled: true },
  ]}
/>;

// Problems:
// 1. Complex, nested configuration
// 2. Hard to add custom rendering
// 3. Limited flexibility in layout
// 4. JSX mixed with config objects
