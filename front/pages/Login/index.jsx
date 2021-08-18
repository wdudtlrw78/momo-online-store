import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import useInput from '../../hooks/useInput';
import { loginRequestAction } from '../../_reducers/user';
import './styles.scss';

function Login({ history }) {
  const dispatch = useDispatch();
  const { logInLoading, logInDone, logInError } = useSelector((state) => state.user);

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
  }, [logInDone]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
      onEmailFocus.current.focus();
      setEmail('');
      setPassword('');
    }
  }, [logInError]);

  return (
    <>
      {logInLoading && <Loader />}
      <div className="login-container">
        <div className="category-group">
          <Link to="/login">Sign In</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="login-form">
          <form onSubmit={onSubmit}>
            <label className="email-label">
              <span>Email</span>
              <input type="email" ref={onEmailFocus} value={email} onChange={onChangeEmail} />
            </label>
            <label className="password-label">
              <span>Password</span>
              <input type="password" value={password} onChange={onChangePassword} />
            </label>
            <button type="submit">LOG IN</button>
          </form>

          <p className="link-container">
            New Customer? <Link to="/register">REGISTER</Link>
          </p>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
