import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MenMenuItems, WomenMenuItems } from '@lib/MenuItems';
import { useDispatch, useSelector } from 'react-redux';
import MobileSearchBox from '../MobileSearchBox';
import './styles.scss';
import { logOutRequestAction } from '../../_reducers/user';

function MobileNav({ setShowSearchBox }) {
  const dispatch = useDispatch();

  const [ShowNav, setShowNav] = useState(false);
  const [ShowWomen, setShowWomen] = useState(true);
  const [ShowMen, setShowMen] = useState(false);

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

  const onToggleGender = useCallback((e) => {
    if (e.target.textContent === 'MEN') {
      setShowWomen(false);
      setShowMen(true);
    } else {
      setShowWomen(true);
      setShowMen(false);
    }
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
          <aside>
            {/* Search */}
            <MobileSearchBox onToggleNav={onToggleNav} />

            {/* Navigation */}
            <section>
              {/* Main */}
              <div className="main-menu" onClick={onToggleGender} role="presentation">
                <ul>
                  <li>
                    <button type="button" className={ShowWomen ? 'active' : undefined}>
                      WOMEN
                    </button>
                  </li>
                  <li>
                    <button type="button" className={ShowMen ? 'active' : undefined}>
                      MEN
                    </button>
                  </li>
                </ul>
                {userData?.isAuth ? (
                  <>
                    <Link to="/profile" className="profile" onClick={onToggleNav}>
                      MY MOMO
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

              {/* Category */}
              {ShowWomen && (
                <ul className="category--women">
                  {WomenMenuItems.map((item) => (
                    <li key={item.key}>
                      <Link to={item.url} onClick={onToggleNav}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {ShowMen && (
                <ul className="category--men">
                  {MenMenuItems.map((item) => (
                    <li key={item.key}>
                      <Link to={item.url} onClick={onToggleNav}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <div className="dimmed" onClick={onToggleNav} role="presentation" />
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
