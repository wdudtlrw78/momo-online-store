import React from 'react';
import MobileNav from '../MobileNav';
import './styles.scss';

function Header() {
  return (
    <header>
      <nav>
        <div className="left__group">
          <MobileNav />
          <button type="button" className="search-btn">
            <i className="fas fa-search" />
          </button>
        </div>
        <a href="/" className="logo">
          MOMO
        </a>
        <a href="/user/cart" className="cart-btn">
          <span>CART(0)</span>
        </a>
      </nav>
    </header>
  );
}

export default Header;
