import React from 'react';
import Loader from '@components/Loader';

import './styles.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function HomeScreen() {
  const { authLoading } = useSelector((state) => state.user);
  if (authLoading) {
    return <Loader />;
  }
  return (
    <>
      <section>
        <img src="../../public/images/Home/mobile-start-overlay-.gif" alt="visual" />
        <img src="../../public/images/Home/section-visual.jpg" className="desktop" alt="visual" />
        <div className="inner">
          <div className="visual-container">
            <h2 className="visual__title">The new essentials</h2>
            <p className="visual__description">Discover our latest edit of Core by MOMO</p>
            <div className="visual__admission">
              <div className="visual__admission--women">
                <Link to="/women">SHOP WOMEN</Link>
              </div>
              <div className="visual__admission--men">
                <Link to="/men">SHOP MEN</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="touch-target">
        <p>EXPLORE MOMO</p>
        <div>
          <Link to="/women/category/dresses">Women&apos;s dresses</Link>
          <Link to="/men/category/jeans">Men&apos;s jeans</Link>
          <Link to="/women/category/trousers">Women&apos;s trousers</Link>
          <Link to="/men/category/tops">Men&apos;s tops</Link>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
