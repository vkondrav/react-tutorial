// @ts-nocheck
// Named render prop - works but verbose
<Counter
  render={(count, increment) => (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )}
/>;
