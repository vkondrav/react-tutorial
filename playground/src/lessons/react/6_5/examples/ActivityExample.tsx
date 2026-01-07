// @ts-nocheck
// React 19 Activity API (Experimental)
import { unstable_Activity as Activity } from 'react';

function TabPanel() {
  const [activeTab, setActiveTab] = useState('counter');

  return (
    <div>
      <button onClick={() => setActiveTab('counter')}>Counter</button>
      <button onClick={() => setActiveTab('form')}>Form</button>

      {/* Activity preserves state while hiding */}
      <Activity mode={activeTab === 'counter' ? 'visible' : 'hidden'}>
        <Counter />
      </Activity>

      <Activity mode={activeTab === 'form' ? 'visible' : 'hidden'}>
        <DraftForm />
      </Activity>
    </div>
  );
}
