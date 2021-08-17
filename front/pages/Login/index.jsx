import React, { useCallback, useEffect, useRef } from 'react';
import './styles.scss';

function Login() {
  const onEmailFocus = useRef(null);

  const onSubmit = useCallback(() => {}, []);

  useEffect(() => {
    onEmailFocus.current.focus();
  }, []);

  return (
    <div className="login-container">
      <div className="category-group">
        <a href="/login">Sign In</a>
        <a href="/register">Register</a>
      </div>

      <div className="login-form">
        <form onSubmit={onSubmit}>
          <label className="email-label">
            <span>Email</span>
            <input type="email" ref={onEmailFocus} />
          </label>
          <label className="password-label">
            <span>Password</span>
            <input type="password" />
          </label>
          <button type="submit">LOG IN</button>
        </form>

        <p className="link-container">
          New Customer? <a href="/register">REGISTER</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
