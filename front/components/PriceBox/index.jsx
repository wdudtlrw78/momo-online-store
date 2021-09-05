import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import './styles.scss';

function PriceBox({ list, handleFilters }) {
  const [Value, setValue] = useState(0);

  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value);
      handleFilters(event.target.value);
    },
    [handleFilters],
  );

  return (
    <Radio.Group onChange={handleChange} value={Value}>
      {list?.map((value) => (
        <Radio key={value._id} value={value._id} className="price">
          <span className="products__price">{value.name}</span>
        </Radio>
      ))}
    </Radio.Group>
  );
}

PriceBox.propTypes = {
  list: PropTypes.array.isRequired,
  handleFilters: PropTypes.func.isRequired,
};

export default PriceBox;
