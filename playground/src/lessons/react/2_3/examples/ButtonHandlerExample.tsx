// @ts-nocheck
function Button() {
  const [count, setCount] = useState(0);

  // Event handler function
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e is the SyntheticEvent object
    console.log('Clicked!', e);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>Click me</button>;
}
