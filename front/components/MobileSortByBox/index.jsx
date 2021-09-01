import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function MobileSortByBox({ list, handleFilters, header, onToggleMobileSortButton, setSortBoxTitle }) {
  const [sort, setSort] = useState(0);

  const onClickSort = useCallback(
    (e) => {
      setSort(e.target.value);
      handleFilters(e.target.value);
      setSortBoxTitle(e.target.textContent);
    },
    [sort],
  );

  return (
    <>
      <aside className="sort-box">
        <div className="sort-box__upper">
          <span className="sort-box__header">{header}</span>
          <button type="button" className="close-btn" style={{ color: '#ccc' }} onClick={onToggleMobileSortButton}>
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="sort-box__menu" onClick={onClickSort} value={sort} role="presentation">
          <ul onClick={onToggleMobileSortButton} role="presentation">
            {list?.map((item) => (
              <li key={item._id} value={item._id}>
                {item.name}
              </li>
            ))}
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
  handleFilters: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  setSortBoxTitle: PropTypes.func.isRequired,
};

export default MobileSortByBox;
