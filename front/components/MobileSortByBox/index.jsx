import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function MobileSortByBox({ header, onToggleMobileSortButton }) {
  return (
    <>
      <aside className="sort-box">
        <div className="sort-box__upper">
          <span className="sort-box__header">{header}</span>
          <button type="button" className="close-btn" style={{ color: '#ccc' }} onClick={onToggleMobileSortButton}>
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="sort-box__menu">
          <ul>
            <li>Newest</li>
            <li>Popular Product</li>
            <li>Lowest Price</li>
            <li>Highest Price</li>
          </ul>
        </div>

        <div className="sort-box__dimmed" role="presentation" onClick={onToggleMobileSortButton} />
      </aside>
    </>
  );
}

MobileSortByBox.propTypes = {
  header: PropTypes.string.isRequired,
  onToggleMobileSortButton: PropTypes.func.isRequired,
};

export default MobileSortByBox;
