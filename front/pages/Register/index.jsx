import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { REGISTER_REQUEST } from '../../_reducers/user';
import './styles.scss';
import Loader from '../../components/Loader';

function Register({ history }) {
  const dispatch = useDispatch();
  const { registerLoading, registerDone, registerError } = useSelector((state) => state.user);

  const [nickname, onChangeNickname] = useInput('');
  const [email, onChangeEamil] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onNicknameFocus = useRef(null);

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

      console.log(nickname, email, password);

      dispatch({
        type: REGISTER_REQUEST,
        data: { nickname, email, password },
      });
    },
    [nickname, email, password, passwordConfirm],
  );

  useEffect(() => {
    onNicknameFocus.current.focus();

    if (registerDone) {
      alert('회원가입이 완료되었습니다');
      history.push('/login');
    }
  }, [registerDone]);

  useEffect(() => {
    if (registerError) {
      alert(registerError);
    }
  }, [registerError]);

  return (
    <>
      {registerLoading && <Loader />}
      <div className="register-container">
        <div className="category-group">
          <a href="/login">Sign In</a>
          <a href="/register">Register</a>
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
              <input type="password" required value={password} onChange={onChangePassword} autoComplete="off" />
            </label>
            <label className="confirm-password-label">
              <span>Confirm Password</span>
              <input
                type="password"
                required
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
                autoComplete="off"
              />
            </label>
            <button type="submit">REGISTER</button>
          </form>

          {passwordError && <p className="error-message">Passwords do not match</p>}

          <p className="link-container">
            Have an Account? <a href="/login">LOGIN</a>
          </p>
        </div>
      </div>
    </>
  );
}

Register.propTypes = {
  history: PropTypes.element.isRequired,
};

export default Register;
