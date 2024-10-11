import React from 'react';

const LoadingPage: React.FC = () => {
  return (
    <div className="container text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>Loading data, please wait...</p>
    </div>
  );
};

export default LoadingPage;
