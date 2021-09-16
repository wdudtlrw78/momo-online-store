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
        <div className="visual__images-container">
          <img src="../../images/17df248b5916571a727a9cae3d2150b1.jpg" className="visual__images-left" alt="visual" />
          <img src="../../images/UDJA1C101G2_2.jpg" className="visual__images-right" alt="visual" />
        </div>
        <div className="inner">
          <div className="visual-container">
            <h2 className="visual__title">The new essentials</h2>
            <p className="visual__description">Discover our latest edit of Core by MOMO</p>
            <div className="visual__admission">
              <div className="visual__admission--shop">
                <Link to="/shop">VIEW</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="touch-target">
        <p>EXPLORE MOMO</p>
        <div>
          <Link to="/shop">OUTERWEAR</Link>
          <Link to="/shop">DRESSES</Link>
          <Link to="/shop">TOPS</Link>
          <Link to="/shop">BOTTOMS</Link>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
