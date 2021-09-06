import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function ProductInfo({ detail }) {
  return (
    <div className="info-container">
      <h3 className="info__title">{detail.title}</h3>
      <span className="info__price">${detail.price} USD</span>
      <p className="info__description">{detail.description}</p>
    </div>
  );
}

ProductInfo.propTypes = {
  detail: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};

export default ProductInfo;
