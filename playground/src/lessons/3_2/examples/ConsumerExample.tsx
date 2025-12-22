// @ts-nocheck
function DisplayCount() {
  const { count } = useCounter();
  return <div>{count}</div>;
}

function IncrementButton() {
  const { increment } = useCounter();
  return <button onClick={increment}>+</button>;
}
