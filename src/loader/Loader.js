import React from 'react';
import PropTypes from 'prop-types';

const Loader = (props) => {
  const { isLoading, isError, errorMessage, children } = props;

  if (isLoading) {
    return <p>Ładowanie...</p>;
  }

  if (isError) {
    return <p style={{ color: 'red' }}>Błąd: {errorMessage}</p>;
  }

  return <div>{children}</div>;
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default Loader;
