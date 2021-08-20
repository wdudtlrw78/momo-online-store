import React from 'react';

import './styles.scss';

function HomeScreen() {
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
                <a href="#" alt="shop-women">
                  SHOP WOMEN
                </a>
              </div>
              <div className="visual__admission--men">
                <a href="#" alt="shop-men">
                  SHOP MEN
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="touch-target">
        <p>EXPLORE MOMO</p>
        <div>
          <a href="#" alt="Women's dresses">
            Women&apos;s dresses
          </a>
          <a href="#" alt="Men's jeans">
            Men&apos;s jeans
          </a>
          <a href="#" alt="Women's trousers">
            Women&apos;s trousers
          </a>
          <a href="#" alt="Men's tops">
            Men&apos;s tops
          </a>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
