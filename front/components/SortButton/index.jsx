import React, { useCallback } from 'react';

import './styles.scss';

function SortButton({ header, showMobileSortByBox, onToggleMobileSortButton, showSrotByButton, setShowSortByButton }) {
  const isDesktopSize = window.document.documentElement.offsetWidth > 1024;

  const onToggleSortButton = useCallback((e) => {
    e.stopPropagation();
    setShowSortByButton((prev) => !prev);
  }, []);

  return (
    <>
      <div className="sort-container">
        {isDesktopSize ? (
          <button type="button" className="sort-button" onClick={onToggleSortButton}>
            <span className="sort">{header}</span>
            {showSrotByButton ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" />}
          </button>
        ) : (
          <button type="button" className="sort-button" onClick={onToggleMobileSortButton}>
            <span className="sort">{header}</span>
            {showMobileSortByBox ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" />}
          </button>
        )}
      </div>
    </>
  );
}

export default SortButton;
