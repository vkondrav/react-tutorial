// @ts-nocheck
function SignupForm() {
  // Three separate state values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <form>
      <input
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <input
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <input
        type="checkbox"
        checked={subscribed}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubscribed(e.target.checked)}
      />
    </form>
  );
}
