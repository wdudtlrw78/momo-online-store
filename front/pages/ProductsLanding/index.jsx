import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import './styles.scss';
import { Link } from 'react-router-dom';
import ProductCard from '@components/ProductCard';
import SortButton from '@components/SortButton';
import MobileSortByBox from '@components/MobileSortByBox';
import SortByBox from '@components/SortByBox';
import Loader from '@components/Loader';
import axios from 'axios';
import { PRODUCT_SERVER } from '@config/config';

function ProductsLanding() {
  const [Products, setProducts] = useState([]);
  const [showMobileSortButton, setShowMobileSortByBox] = useState(false);
  const [showSrotByButton, setShowSortByButton] = useState(false);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [loadMore, setLoadMore] = useState(false);
  const [PostSize, setPostSize] = useState(0);

  const isSortButton = 'sort' || 'fas fa-chevron-down' || 'fas fa-chevron-down';

  const getProducts = useCallback(
    (body) => {
      axios.post(`${PRODUCT_SERVER}/shop`, body).then((response) => {
        if (response.data.success) {
          console.log('success', response.data.productInfo);
          if (loadMore) {
            setProducts([...Products, ...response.data.productInfo]);
          } else {
            setProducts(response.data.productInfo);
          }
          setPostSize(response.data.PostSize);
        } else {
          alert('상품들을 가져오는데 실패했습니다.');
        }
      });
    },
    [loadMore],
  );

  useEffect(() => {
    setLoadMore(false);

    const body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, [Skip, Limit]);

  const onClickLoadMore = useCallback(() => {
    const skip = Skip + Limit;

    const body = {
      skip,
      limit: Limit,
    };

    getProducts(body);
    setSkip(skip);
    setLoadMore(true);
  }, [Skip + Limit, Limit]);

  useEffect(() => {
    function onCloseSortBox(e) {
      if (e.target.className === isSortButton) return;
      setShowSortByButton(false);
    }

    document.body.addEventListener('click', onCloseSortBox);

    return () => {
      document.body.removeEventListener('click', onCloseSortBox);
    };
  }, []);

  const onToggleMobileSortButton = useCallback(() => {
    setShowMobileSortByBox((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
  }, []);

  if (!Products) {
    return <Loader />;
  }

  return (
    <>
      <div className="products-container">
        <h2 className="products__title">ALL</h2>
        <ul className="products-menus">
          <li>
            <Link to="/shop" className="active">
              ALL
            </Link>
          </li>
        </ul>

        <SortButton
          showMobileSortButton={showMobileSortButton}
          onToggleMobileSortButton={onToggleMobileSortButton}
          showSrotByButton={showSrotByButton}
          setShowSortByButton={setShowSortByButton}
        />

        {showMobileSortButton && (
          <MobileSortByBox header="SORT BY" onToggleMobileSortButton={onToggleMobileSortButton} />
        )}

        {showSrotByButton && <SortByBox />}
      </div>
      <ul className="card-container">
        {Products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </ul>

      {PostSize >= Limit && (
        <div>
          <button type="button" onClick={onClickLoadMore}>
            더 보기
          </button>
        </div>
      )}
    </>
  );
}

export default ProductsLanding;

ProductsLanding.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};
