import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { AUTH_REQUEST } from '@_reducers/user';

export default function Auth({ SpecialComponent }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: AUTH_REQUEST,
    });
  }, []);

  return <SpecialComponent />;
}

Auth.propTypes = {
  SpecialComponent: PropTypes.elementType.isRequired,
};
