import React, { useEffect } from 'react';
import Loader from '@components/Loader';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_REQUEST } from '@_reducers/user';
import { Link } from 'react-router-dom';
import leftImage from '../../public/images/leftImage.jpg';
import rightImage from '../../public/images/rightImage.jpg';

function HomeScreen() {
  const { authLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: AUTH_REQUEST,
    });
  }, []);

  if (authLoading) {
    return <Loader />;
  }
  return (
    <>
      <section>
        <div className="visual__images-container">
          <img src={leftImage} className="visual__images-left" alt="visual" />
          <img src={rightImage} className="visual__images-right" alt="visual" />
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
