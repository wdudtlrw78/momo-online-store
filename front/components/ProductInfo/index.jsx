import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART_REQUEST } from '@_reducers/user';
import { withRouter } from 'react-router';

function ProductInfo({ detail, history }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const onClickAddToCart = useCallback(() => {
    dispatch({
      type: ADD_TO_CART_REQUEST,
      data: {
        productId: detail._id,
      },
    });

    if (!userData?.isAuth) {
      alert('You need to log in.');
      history.push('/login');
    }
  }, [detail, userData]);

  return (
    <>
      <div className="info-container">
        <h1 className="info__title">{detail.title}</h1>
        <span className="info__price">${detail.price} USD</span>
        <p className="info__description">{detail.description}</p>
      </div>

      <div className="info__cart-btn">
        <button type="button" onClick={onClickAddToCart}>
          ADD TO CART
        </button>
      </div>
    </>
  );
}

ProductInfo.propTypes = {
  detail: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,

  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(ProductInfo);
