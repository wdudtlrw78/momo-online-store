import React, { useCallback, useState } from 'react';
import { MenMenuItems, WomenMenuItems } from '../../lib/MenuItems';
import SearchBox from '../SearchBox';
import './styles.scss';

function MobileNav() {
  const [ShowNav, setShowNav] = useState(false);
  const [ShowWomen, setShowWomen] = useState(true);
  const [ShowMen, setShowMen] = useState(false);

  const onToggleNav = useCallback(() => {
    setShowNav((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
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

  return (
    <>
      <button type="button" className="btn--toggle" onClick={onToggleNav}>
        <i className="fas fa-bars 2x" />
      </button>
      {ShowNav && (
        <>
          <aside>
            {/* Search */}
            <SearchBox onToggleNav={onToggleNav} />

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
                <a href="/login" className="login">
                  LOGIN
                </a>
              </div>

              {/* Category */}
              {ShowWomen && (
                <div className="category--women">
                  {WomenMenuItems.map((item) => (
                    <a key={item.title}>{item.title}</a>
                  ))}
                </div>
              )}

              {ShowMen && (
                <div className="category--men">
                  {MenMenuItems.map((item) => (
                    <a key={item.title}>{item.title}</a>
                  ))}
                </div>
              )}
            </section>
            <div className="dimmed" onClick={onToggleNav} role="presentation" />
          </aside>
        </>
      )}
    </>
  );
}

export default MobileNav;
