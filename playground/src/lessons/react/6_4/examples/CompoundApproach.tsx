// @ts-nocheck
// ✅ Compound components approach
<Tabs defaultTab="home">
  <Tabs.List>
    <Tabs.Tab id="home">🏠 Home</Tabs.Tab>
    <Tabs.Tab id="profile">👤 Profile</Tabs.Tab>
    <Tabs.Tab id="settings" disabled>
      ⚙️ Settings
    </Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel id="home">
    <h3>Welcome Home!</h3>
    <p>This is your dashboard.</p>
  </Tabs.Panel>
  <Tabs.Panel id="profile">
    <ProfileForm />
  </Tabs.Panel>
  <Tabs.Panel id="settings">
    <SettingsPanel />
  </Tabs.Panel>
</Tabs>;

// Benefits:
// 1. Natural JSX structure
// 2. Full control over rendering
// 3. Easy to add icons, badges, etc.
// 4. Type-safe and discoverable API
