import React from 'react';

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-content">
        <h1>Unauthorized Access</h1>
        <p>You do not have permission to access this page.</p>
        <p>Return to login page <a href="/Login">here</a>.</p>
      </div>
    </div>
  );
};

export default Unauthorized;