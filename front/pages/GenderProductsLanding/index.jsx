import React, { useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PRODUCTS_REQUEST } from '@_reducers/product';
import './styles.scss';

function GenderProductsLanding({ match }) {
  const { gender } = match.params.gender;
  const dispatch = useDispatch();

  const { productsInfo } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
      data: gender,
    });
  }, []);

  return <div>GenderProductsLanding Page {gender}</div>;
}

export default GenderProductsLanding;

GenderProductsLanding.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};
