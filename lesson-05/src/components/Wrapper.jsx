import React from 'react';

const Wrapper = ({ title, children }) => {
  return (
    <div className="wrapper">
      <h1 className="header">{title}</h1>
      <div className="children-container">
        {children} 
      </div>
    </div>
  );
};

export default Wrapper;
