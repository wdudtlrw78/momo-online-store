import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { logOutRequestAction } from '@_reducers/user';

function MobileNav() {
  const dispatch = useDispatch();

  const [ShowNav, setShowNav] = useState(false);

  const { userData } = useSelector((state) => state.user);

  const onToggleNav = useCallback(() => {
    setShowNav((prev) => !prev);
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
            {/* Navigation */}
            <section>
              <button type="button" onClick={onToggleNav}>
                <i className="fas fa-times" />
              </button>

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

export default MobileNav;
