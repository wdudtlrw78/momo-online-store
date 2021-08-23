import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { AUTH_REQUEST } from '@_reducers/user';

export default (SpecialComponent) => {
  const AuthenticateCheck = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({
        type: AUTH_REQUEST,
      });
    }, []);

    return <SpecialComponent {...props} />;
  };

  return AuthenticateCheck;
};
