import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function CategoryBox({ list, handleFilters }) {
  const [Checked, setChecked] = useState([]);

  const onChangeToggle = useCallback(
    (value) => {
      const currentIndex = Checked.indexOf(value);

      const newChecked = [...Checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
      handleFilters(newChecked);
    },
    [Checked, handleFilters],
  );

  const isChecked = true;
  const isUnChecked = false;

  return (
    <>
      {list?.map((item) => (
        <React.Fragment key={item._id}>
          <input
            type="checkbox"
            onChange={() => onChangeToggle(item._id)}
            checked={Checked.indexOf(item._id) === -1 ? isUnChecked : isChecked}
            id={item.name}
            className="checkbox"
          />
          <label htmlFor={item.name} className="products__checkbox">
            {item.name}
          </label>
        </React.Fragment>
      ))}
    </>
  );
}

CategoryBox.propTypes = {
  list: PropTypes.array.isRequired,
  handleFilters: PropTypes.func.isRequired,
};

export default CategoryBox;
