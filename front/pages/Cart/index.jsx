import React, { useCallback, useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useSelector } from 'react-redux';
import './styles.scss';
import axios from 'axios';
import UserCardBlock from '@components/UserCardBlock';

import { PRODUCT_SERVER } from '@config/config';
import { USER_SERVER } from '../../config/config';

function CartPage() {
  const { userData } = useSelector((state) => state.user);
  const [cartDetail, setCartDetail] = useState([]);
  const [showTotal, setShowTotal] = useState(0);

  const calculateTotal = useCallback((totalPrice) => {
    let total = 0;

    totalPrice.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;

      return total;
    });

    setShowTotal(total);
  }, []);

  useEffect(() => {
    const cartItems = [];

    if (userData && userData?.cart) {
      if (userData?.cart.length > 0) {
        userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        axios.get(`${PRODUCT_SERVER}/products_by_id?id=${cartItems}&type=array`).then((response) => {
          userData.cart.forEach((cartItem) => {
            response.data.product.forEach((productDetail, index) => {
              if (cartItem.id === productDetail._id) {
                response.data.product[index].quantity = cartItem.quantity;
              }
            });
          });
          if (response.data.success) {
            setCartDetail(response.data.product);
            calculateTotal(response.data.product);
            console.log(response.data.product);
          }
        });
      }
    }
  }, [userData]);

  const removeFromCart = useCallback((productId) => {
    axios.get(`${USER_SERVER}/removeFromCart?id=${productId}`).then((response) => {
      response.data.cart.forEach((item) => {
        response.data.productInfo.forEach((product, index) => {
          if (item.id === product._id) {
            response.data.productInfo[index].quantity = item.quantity;
          }
        });
      });

      if (response.data.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  }, []);

  return (
    <div className="cart-container">
      <h1 className="cart__title">My Cart({userData?.cart ? userData?.cart.length : 0})</h1>
      {!userData?.isAuth || userData.cart?.length === 0 ? (
        <p className="cart__empty">장바구니가 비었습니다</p>
      ) : (
        <>
          <div className="cart_card-block">
            <UserCardBlock products={cartDetail} removeItem={removeFromCart} />
          </div>
          <div>
            <h2 className="cart__price-total">
              <span>Total Amount:</span> ${showTotal}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

CartPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default CartPage;
