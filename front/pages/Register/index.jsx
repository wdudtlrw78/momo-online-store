import React, { useCallback, useEffect, useRef } from 'react';
import './styles.scss';

function Register() {
  const onNicknameFocus = useRef(null);

  const onSubmit = useCallback(() => {}, []);

  useEffect(() => {
    onNicknameFocus.current.focus();
  }, []);

  return (
    <div className="login-container">
      <div className="category-group">
        <a href="/login">Sign In</a>
        <a href="/register">Register</a>
      </div>

      <div className="login-form">
        <form onSubmit={onSubmit}>
          <label className="Nickname-label">
            <span>Nickname</span>
            <input type="Nickname" ref={onNicknameFocus} />
          </label>
          <label className="email-label">
            <span>Email</span>
            <input type="email" />
          </label>
          <label className="password-label">
            <span>Password</span>
            <input type="password" />
          </label>
          <label className="confirm-password-label">
            <span>Confirm Password</span>
            <input type="password" />
          </label>
          <button type="submit">REGISTER</button>
        </form>

        <p className="link-container">
          Have an Account? <a href="/login">LOGIN</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
