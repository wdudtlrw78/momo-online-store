import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenMenuItems, WomenMenuItems } from '@lib/MenuItems';
import { useSelector } from 'react-redux';

import MobileNav from '../MobileNav';
import './styles.scss';
import SearchBox from '../SearchBox';

function Header() {
  const [ShowSearchBox, setShowSearchBox] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

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
            <li className="menu--women desktop">
              <Link to="#">WOMEN</Link>
              <ul className="drop-menu__women">
                {WomenMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link to={item.url}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="menu--men desktop">
              <Link to="#">MEN</Link>
              <ul className="drop-menu__men">
                {MenMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link to={item.url} alt={item.title}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
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
          {userInfo ? (
            <>
              <Link to="/profile" className="login desktop">
                MY MOMO
              </Link>
              <span className="logout desktop">LOGOUT</span>
            </>
          ) : (
            <Link to="/login" className="login desktop">
              LOGIN
            </Link>
          )}
          <Link to="/user/cart" className="nav__cart-btn">
            <span>CART(0)</span>
          </Link>
        </div>
      </nav>
      {ShowSearchBox && <SearchBox onToggleSearchBox={onToggleSearchBox} />}
    </header>
  );
}

export default Header;
