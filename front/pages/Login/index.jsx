import React, { useCallback, useEffect, useRef } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '@components/Loader';
import useInput from '@hooks/useInput';
import { loginRequestAction } from '@_reducers/user';
import './styles.scss';

function Login({ history }) {
  const dispatch = useDispatch();

  const { logInLoading, logInError, logInDone, authLoading, userData } = useSelector((state) => state.user);
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(loginRequestAction({ email, password }));
    },
    [email, password],
  );

  const onEmailFocus = useRef(null);
  useEffect(() => {
    onEmailFocus.current.focus();

    if (logInDone) {
      history.replace('/');
    }

    if (userData?.isAuth) {
      history.replace('/');
      alert('Only users who are not logged in can access it.');
    }
  }, [logInDone, userData?.isAuth]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
      onEmailFocus.current.focus();
      setEmail('');
      setPassword('');
    }
  }, [logInError]);

  if (logInLoading) {
    return <Loader />;
  }

  return (
    <div className="login-container">
      <div className="category-group">
        <Link to="/login">Sign In</Link>
        <Link to="/register">Register</Link>
      </div>

      <div className="login-form">
        <form onSubmit={onSubmit}>
          <label className="email-label">
            <span>Email</span>
            <input type="email" required ref={onEmailFocus} value={email || ''} onChange={onChangeEmail} />
          </label>
          <label className="password-label">
            <span>Password</span>
            <input type="password" required value={password} onChange={onChangePassword} autoComplete="off" />
          </label>
          <button type="submit">LOG IN</button>
        </form>

        <p className="link-container">
          New Customer? <Link to="/register">REGISTER</Link>
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Login;
