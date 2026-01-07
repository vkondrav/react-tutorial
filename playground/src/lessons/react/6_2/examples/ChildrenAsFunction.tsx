// @ts-nocheck
// Children as function - cleaner syntax!
<Counter>
  {(count, increment) => (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )}
</Counter>;
