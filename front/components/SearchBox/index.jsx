import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function SearchBox({ onToggleNav }) {
  return (
    <>
      <form>
        <input type="text" placeholder="Search products..." className="search__box" />
      </form>
      <button type="button" className="search__box--btn">
        <i className="fas fa-search fa-md" style={{ color: '#ccc' }} />
      </button>
      <button type="button" className="close-btn" style={{ color: '#ccc' }} onClick={onToggleNav}>
        <i className="fas fa-times" />
      </button>
    </>
  );
}

SearchBox.propTypes = {
  onToggleNav: PropTypes.func.isRequired,
};

export default SearchBox;
