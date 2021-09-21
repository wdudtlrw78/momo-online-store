import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '@hooks/useInput';
import { REGISTER_REQUEST } from '@_reducers/user';
import './styles.scss';
import Loader from '@components/Loader';

function Register({ history }) {
  const dispatch = useDispatch();
  const { registerLoading, registerDone, registerError, userData } = useSelector((state) => state.user);

  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [email, onChangeEamil, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordConfirm = useCallback(
    (e) => {
      setPasswordConfirm(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (password !== passwordConfirm) {
        setPasswordConfirm(true);
      }

      dispatch({
        type: REGISTER_REQUEST,
        data: { nickname, email, password },
      });
    },
    [nickname, email, password, passwordConfirm],
  );

  const onNicknameFocus = useRef(null);
  useEffect(() => {
    onNicknameFocus.current.focus();

    if (registerDone) {
      alert('Membership registration completed');
      history.replace('/login');
    }

    if (userData?.isAuth) {
      history.replace('/');
      alert('Only users who are not logged in can access it.');
    }
  }, [registerDone, userData?.isAuth]);

  useEffect(() => {
    if (registerError) {
      alert(registerError);
      setNickname('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');

      onNicknameFocus.current.focus();
    }
  }, [registerError]);

  if (registerLoading) {
    return <Loader />;
  }

  return (
    <div className="register-container">
      <div className="category-group">
        <Link to="/login">Sign In</Link>
        <Link to="/register">Register</Link>
      </div>

      <div className="register-form">
        <form onSubmit={onSubmit}>
          <label className="Nickname-label">
            <span>Nickname</span>
            <input type="Nickname" required ref={onNicknameFocus} value={nickname} onChange={onChangeNickname} />
          </label>
          <label className="email-label">
            <span>Email</span>
            <input type="email" required value={email} onChange={onChangeEamil} />
          </label>
          <label className="password-label">
            <span>Password</span>
            <input
              type="password"
              required
              minLength={5}
              value={password}
              onChange={onChangePassword}
              autoComplete="off"
            />
          </label>
          <label className="confirm-password-label">
            <span>Confirm Password</span>
            <input
              type="password"
              required
              minLength={5}
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
              autoComplete="off"
            />
          </label>
          <button type="submit">REGISTER</button>
        </form>

        {passwordError && <p className="error-message">Passwords do not match</p>}

        <p className="link-container">
          Have an Account?&nbsp;
          <Link to="/login">LOGIN</Link>
        </p>
      </div>
    </div>
  );
}

Register.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Register;
