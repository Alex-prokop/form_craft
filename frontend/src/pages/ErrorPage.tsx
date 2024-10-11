import React from 'react';

interface ErrorPageProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div className="container text-center mt-5">
      <h1>Oops! Something went wrong.</h1>
      <p>{message || 'Please try again later.'}</p>{' '}
    </div>
  );
};

export default ErrorPage;
