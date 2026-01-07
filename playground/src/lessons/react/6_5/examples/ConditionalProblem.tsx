// @ts-nocheck
// ❌ State is LOST when tab changes
function TabPanel() {
  const [activeTab, setActiveTab] = useState('counter');

  return (
    <div>
      <button onClick={() => setActiveTab('counter')}>Counter</button>
      <button onClick={() => setActiveTab('form')}>Form</button>

      {/* When switching tabs, the component unmounts */}
      {/* and ALL its state is destroyed! */}
      {activeTab === 'counter' && <Counter />}
      {activeTab === 'form' && <DraftForm />}
    </div>
  );
}
