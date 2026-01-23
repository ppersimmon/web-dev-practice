import React from 'react';
import Wrapper from './components/Wrapper.jsx';
import Counter from './components/Counter.jsx';


const App = () => {
  return (
    <div className="app-container">
      <Wrapper title="My Counter">
        <Counter initialValue={0} />
        <Counter initialValue={10} />
      </Wrapper>
    </div>
  );
};

export default App;
