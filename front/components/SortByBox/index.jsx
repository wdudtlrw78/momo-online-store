import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function SortByBox({ list, handleFilters, setSortBoxTitle }) {
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
    <div className="sort-box__desktop" role="presentation" onClick={onClickSort} value={sort}>
      <ul>
        {list?.map((item) => (
          <li key={item._id} value={item._id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

SortByBox.propTypes = {
  handleFilters: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  setSortBoxTitle: PropTypes.func.isRequired,
};

export default SortByBox;
