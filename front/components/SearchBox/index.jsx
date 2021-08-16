import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function SearchBox({ onToggleSearchBox }) {
  const onSearchFocus = useRef(null);

  useEffect(() => {
    onSearchFocus.current.focus();
  }, []);

  return (
    <>
      <div className="search__form--desktop">
        <form>
          <input type="text" placeholder="Search products..." className="search__box--desktop" ref={onSearchFocus} />
          <button type="button" className="close-btn--desktop" style={{ color: '#ccc' }} onClick={onToggleSearchBox}>
            <i className="fas fa-times" />
          </button>
        </form>
      </div>

      <div className="dimmed--desktop" onClick={onToggleSearchBox} role="presentation" />
    </>
  );
}

SearchBox.propTypes = {
  onToggleSearchBox: PropTypes.func.isRequired,
};

export default SearchBox;
