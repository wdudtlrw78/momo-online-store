import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AUTH_REQUEST } from '@_reducers/user';

export default (SpecialComponent) => {
  const AuthenticateCheck = (props) => {
    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
      dispatch({
        type: AUTH_REQUEST,
      });
    }, []);

    return <SpecialComponent {...props} userData={userData} />;
  };

  return AuthenticateCheck;
};
