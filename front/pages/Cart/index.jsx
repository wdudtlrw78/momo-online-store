import React, { useCallback, useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import axios from 'axios';
import UserCardBlock from '@components/UserCardBlock';
import Loader from '@components/Loader';
import { REMOVE_CART_ITEM, SUCCESS_BUY_REQUEST } from '@_reducers/user';
import { PRODUCT_SERVER, USER_SERVER } from '@config/config';
import Paypal from '@lib/Paypal';

function CartPage() {
  const dispatch = useDispatch();

  const { userData, successBuyDone, authLoading } = useSelector((state) => state.user);

  const [CartDetail, setCartDetail] = useState([]);
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowBuySuccess, setShowBuySucess] = useState(false);

  const calculateTotal = useCallback((totalPrice) => {
    let total = 0;

    totalPrice.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;

      return total;
    });

    setTotal(total);
    setShowTotal(true);
  }, []);

  useEffect(() => {
    const cartItems = [];

    if (userData && userData?.cart) {
      if (userData?.cart.length > 0) {
        userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        axios
          .get(`${PRODUCT_SERVER}/products_by_id?id=${cartItems}&type=array`)
          .then((response) => {
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
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }, [userData]);

  useEffect(() => {
    if (successBuyDone) {
      setCartDetail([]);
      setShowTotal(false);
      setShowBuySucess(true);
    }
  }, [successBuyDone]);

  const removeFromCart = useCallback((productId) => {
    axios.get(`${USER_SERVER}/removeFromCart?id=${productId}`).then((response) => {
      // productInfo, cart 정보를 조합해서 CartDetail을 만든다.
      response.data.cart.forEach((item) => {
        response.data.productInfo.forEach((product, index) => {
          if (item.id === product._id) {
            response.data.productInfo[index].quantity = item.quantity;
          }
        });
      });

      if (response.data.success) {
        setCartDetail(response.data.productInfo);
        calculateTotal(response.data.productInfo);
        dispatch({
          type: REMOVE_CART_ITEM,
          data: response.data.cart,
        });
      }

      if (response.data.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  }, []);

  const onSuccess = useCallback(
    (paymentData) => {
      dispatch({
        type: SUCCESS_BUY_REQUEST,
        data: {
          paymentData,
          cartDetail: CartDetail,
        },
      });
    },
    [CartDetail],
  );

  if (authLoading) {
    return <Loader />;
  }

  return (
    <div className="cart-container">
      <h1 className="cart__title">My Cart({userData?.cart ? userData?.cart.length : 0})</h1>

      {ShowTotal && userData?.isAuth ? (
        <>
          <div className="cart_card-block">
            <UserCardBlock products={CartDetail} removeItem={removeFromCart} />
          </div>
          <div>
            <h2 className="cart__price-total">
              <span>Total Amount:</span> ${Total}
            </h2>
            <Paypal total={Total} onSuccess={onSuccess} />
          </div>
        </>
      ) : ShowBuySuccess ? (
        <div className="cart__buy-success">
          <i className="fas fa-check-circle" />
          <p>Successfully Purchased Items!</p>
        </div>
      ) : (
        <>
          <div>
            <p className="cart__empty">The shopping basket is empty.</p>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
