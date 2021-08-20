import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useSelector } from 'react-redux';

function CartPage(props) {
  const { userData } = useSelector((state) => state.user);

  if (!userData?.isAuth) {
    props.history.push('/');
  }

  return <div>CartPage</div>;
}

CartPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default CartPage;
