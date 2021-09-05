import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function SearchFeature({ updateSearchTerm }) {
  const [SearchTerm, setSearchTerm] = useState('');

  const onChangeSearchTerm = useCallback(
    (e) => {
      setSearchTerm(e.currentTarget.value);
      updateSearchTerm(e.currentTarget.value);
    },
    [updateSearchTerm],
  );

  return (
    <div className="products__search-container">
      <input
        onChange={onChangeSearchTerm}
        value={SearchTerm}
        placeholder="Search here..."
        className="products__search"
      />
    </div>
  );
}

SearchFeature.propTypes = {
  updateSearchTerm: PropTypes.func.isRequired,
};

export default SearchFeature;
