// @ts-nocheck
// 4 separate useState calls 😬
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');

// 4 separate handlers or inline functions
<>
  onChange={(e) => setFirstName(e.target.value)}
  onChange={(e) => setLastName(e.target.value)}
  // ... etc
</>;
