import React, { useState } from 'react';

const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="counter">
      <h3>Counter</h3>
      <p>Current value: <strong>{count}</strong></p>
      <div className="buttons">
        <button onClick={() => setCount(count - 1)}>Decrease</button>
        <button onClick={() => setCount(count + 1)}>Increase  </button>
      </div>
    </div>
  );
};

export default Counter;
