import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../config/config';
import './styles.scss';

function ProductCard({ product }) {
  return (
    <li className="card__single-container">
      <Link to={`/shop/product/${product._id}`}>
        <span>
          <img className="img-main" src={`${SERVER_URL}/${product.images[0]}`} alt="product card" />
          <img className="img-hover" src={`${SERVER_URL}/${product.images[1]}`} alt="product card" />
        </span>

        <div className="text-info">
          <p className="card__title">{product.title}</p>
          <span className="card__price">${product.price} USD</span>
        </div>
      </Link>
    </li>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    images: PropTypes.array,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
