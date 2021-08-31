import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutRequestAction } from '@_reducers/user';

import MobileNav from '../MobileNav';
import './styles.scss';
import SearchBox from '../SearchBox';

function Header() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [ShowSearchBox, setShowSearchBox] = useState(false);

  const onToggleSearchBox = useCallback(() => {
    setShowSearchBox((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
  }, []);

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
          <MobileNav setShowSearchBox={setShowSearchBox} />
          <button type="button" className="nav__search-btn" onClick={onToggleSearchBox}>
            <i className="fas fa-search" />
          </button>
        </div>

        <Link to="/" className="logo">
          MOMO
        </Link>

        <div className="nav__right__group">
          <button type="button" className="nav__search-btn desktop" onClick={onToggleSearchBox}>
            <i className="fas fa-search" />
            <span>SEARCH</span>
          </button>
          {userData?.isAuth && userData.isAdmin && (
            <Link to="/admin" className="admin desktop">
              ADMIN
            </Link>
          )}

          {userData?.isAuth ? (
            <>
              <Link to="/history" className="history desktop">
                HISTORY
              </Link>
              <button type="button" className="logout desktop" onClick={onClickLogOut}>
                <span>LOGOUT</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="login desktop">
              LOGIN
            </Link>
          )}

          <Link to="/user/cart" className="nav__cart-btn">
            CART(0)
          </Link>
        </div>
      </nav>
      {ShowSearchBox && <SearchBox onToggleSearchBox={onToggleSearchBox} />}
    </header>
  );
}

export default Header;
