import React from 'react';
import propTypes from 'prop-types';
import './Header.css';

function Header({ title = 'hello' }) {
  return (
    <>
      <h1 title="Header" className="header">
        {title}
      </h1>
    </>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default Header;
