import React, { useCallback, useState } from 'react';
import { MenMenuItems, WomenMenuItems } from '@lib/MenuItems';
import MobileNav from '../MobileNav';
import './styles.scss';
import SearchBox from '../SearchBox';

function Header() {
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

  return (
    <header>
      <nav className="nav">
        <div className="nav__left__group">
          <ul>
            <li>
              <a href="/" className="logo desktop">
                MOMO
              </a>
            </li>
            <li className="menu--women desktop">
              <a href="#" alt="WOMEN">
                WOMEN
              </a>
              <ul className="drop-menu__women">
                {WomenMenuItems.map((item) => (
                  <li key={item.title}>
                    <a href={item.url} alt={item.title}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="menu--men desktop">
              <a href="#" alt="MEN">
                MEN
              </a>
              <ul className="drop-menu__men">
                {MenMenuItems.map((item) => (
                  <li key={item.title}>
                    <a href={item.url} alt={item.title}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <MobileNav />
          <button type="button" className="nav__search-btn" onClick={onToggleSearchBox}>
            <i className="fas fa-search" />
          </button>
        </div>
        <a href="/" className="logo">
          MOMO
        </a>
        <div className="nav__right__group">
          <button type="button" className="nav__search-btn desktop" onClick={onToggleSearchBox}>
            <i className="fas fa-search" />
            <span>SEARCH</span>
          </button>
          <a href="/login" className="login desktop">
            LOGIN
          </a>
          <a href="/user/cart" className="nav__cart-btn">
            <span>CART(0)</span>
          </a>
        </div>
      </nav>
      {ShowSearchBox && <SearchBox onToggleSearchBox={onToggleSearchBox} />}
    </header>
  );
}

export default Header;
