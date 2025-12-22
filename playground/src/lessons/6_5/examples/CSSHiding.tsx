// @ts-nocheck
// ✅ CSS hiding - state is PRESERVED
function TabPanel() {
  const [activeTab, setActiveTab] = useState('counter');

  return (
    <div>
      <button onClick={() => setActiveTab('counter')}>Counter</button>
      <button onClick={() => setActiveTab('form')}>Form</button>

      {/* Both components stay mounted */}
      {/* Hidden via CSS, not unmounted */}
      <div style={{ display: activeTab === 'counter' ? 'block' : 'none' }}>
        <Counter />
      </div>
      <div style={{ display: activeTab === 'form' ? 'block' : 'none' }}>
        <DraftForm />
      </div>
    </div>
  );
}
