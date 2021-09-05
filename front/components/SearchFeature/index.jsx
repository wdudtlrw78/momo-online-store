import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

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
    <div>
      <input
        onChange={onChangeSearchTerm}
        value={SearchTerm}
        placeholder="Search here..."
        className="products__search"
        style={{ width: 250, padding: '0.5rem', border: 'none', borderBottom: '1px solid #999', marginBottom: '1rem' }}
      />
    </div>
  );
}

SearchFeature.propTypes = {
  updateSearchTerm: PropTypes.func.isRequired,
};

export default SearchFeature;
