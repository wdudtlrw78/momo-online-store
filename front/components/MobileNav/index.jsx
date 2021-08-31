import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MobileSearchBox from '../MobileSearchBox';
import './styles.scss';
import { logOutRequestAction } from '../../_reducers/user';

function MobileNav({ setShowSearchBox }) {
  const dispatch = useDispatch();

  const [ShowNav, setShowNav] = useState(false);

  const { userData } = useSelector((state) => state.user);

  const onToggleNav = useCallback(() => {
    setShowNav((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });

    setShowSearchBox(false);
  }, []);

  const onClickLogOut = useCallback(() => {
    dispatch(logOutRequestAction());
    setShowNav(false);
  }, []);

  return (
    <>
      <button type="button" className="btn--toggle" onClick={onToggleNav}>
        <i className="fas fa-bars 2x" />
      </button>
      {ShowNav && (
        <>
          <aside className="mobile-navigation">
            {/* Search */}
            <MobileSearchBox onToggleNav={onToggleNav} />

            {/* Navigation */}
            <section>
              {/* Main */}
              <div className="main-menu" role="presentation">
                <ul>
                  <li>
                    <Link to="/shop" onClick={onToggleNav} className="main-menu__shop">
                      SHOP
                    </Link>
                  </li>
                </ul>
                {userData?.isAuth ? (
                  <>
                    <Link to="/history" className="history" onClick={onToggleNav}>
                      HISTORY
                    </Link>
                    <button type="button" className="logout" onClick={onClickLogOut}>
                      <span>LOGOUT</span>
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="login" onClick={onToggleNav}>
                    LOGIN
                  </Link>
                )}

                {userData?.isAuth && userData.isAdmin && (
                  <Link to="/admin" className="admin" onClick={onToggleNav}>
                    ADMIN
                  </Link>
                )}
              </div>
            </section>
            <div className="mobile-nav__dimmed" onClick={onToggleNav} role="presentation" />
          </aside>
        </>
      )}
    </>
  );
}

MobileNav.propTypes = {
  setShowSearchBox: PropTypes.func.isRequired,
};

export default MobileNav;
