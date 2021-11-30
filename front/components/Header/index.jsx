import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutRequestAction } from '@_reducers/user';

import MobileNav from '../MobileNav';
import './styles.scss';

function Header() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const onClickLogOut = useCallback(() => {
    dispatch(logOutRequestAction());
  }, []);

  return (
    <header>
      <nav className="nav">
        <div className="nav__left__group">
          <ul>
            <li>
              <Link to="/" className="logo desktop">
                MOMO
              </Link>
            </li>
          </ul>
          <MobileNav />
        </div>

        <Link to="/" className="logo">
          MOMO
        </Link>

        <div className="nav__right__group">
          {userData?.isAuth && userData.isAdmin && (
            <Link to="/admin" className="admin desktop">
              ADMIN
            </Link>
          )}

          {userData?.isAuth ? (
            <>
              <Link to="/shop" className="shop desktop">
                SHOP
              </Link>
              <button type="button" className="logout desktop" onClick={onClickLogOut}>
                <span>LOGOUT</span>
              </button>
              <Link to="/history" className="history desktop">
                HISTORY
              </Link>
            </>
          ) : (
            <>
              <Link to="/shop" className="shop desktop">
                SHOP
              </Link>
              <Link to="/login" className="login desktop">
                LOGIN
              </Link>
            </>
          )}

          <Link to="/user/cart" className="nav__cart-btn">
            CART({userData?.cart ? userData?.cart.length : 0})
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
