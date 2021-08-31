import React from 'react';

import './styles.scss';

function SortByBox() {
  return (
    <div className="sort-box__desktop" role="presentation">
      <ul>
        <li>Newest</li>
        <li>Popular Product</li>
        <li>Lowest Price</li>
        <li>Highest Price</li>
      </ul>
    </div>
  );
}

export default SortByBox;
