import React, { useCallback, useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import '../ProductsLanding/styles.scss';
import { Link } from 'react-router-dom';
import ProductCard from '@components/ProductCard';
import SortButton from '@components/SortButton';
import MobileSortByBox from '@components/MobileSortByBox';
import SortByBox from '@components/SortByBox';

import axios from 'axios';
import { PRODUCT_SERVER } from '@config/config';
import { cateogry, sortBox } from '@lib/Datas';

function ProductsCategory({ match }) {
  const [Products, setProducts] = useState([]);
  const [showMobileSortButton, setShowMobileSortByBox] = useState(false);
  const [showSrotByButton, setShowSortByButton] = useState(false);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [loadMore, setLoadMore] = useState(false);
  const [PostSize, setPostSize] = useState(0);

  const isSortButton = 'sort' || 'fas fa-chevron-down' || 'fas fa-chevron-down';
  const categoryId = match.params.categoryId;

  const getProducts = useCallback(
    (body) => {
      axios.post(`${PRODUCT_SERVER}/shop/category/${body.categoryId}`, body).then((response) => {
        if (response.data.success) {
          console.log('success', response.data.productInfo);
          if (loadMore) {
            setProducts([...Products, ...response.data.productInfo]);
          } else {
            setProducts(response.data.productInfo);
          }
          setPostSize(response.data.PostSize);
        } else {
          alert('Failed to bring the products.');
        }
      });
    },
    [loadMore],
  );

  useEffect(() => {
    setLoadMore(false);

    const body = {
      categoryId,
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, [categoryId, Skip, Limit]);

  const onClickLoadMore = useCallback(() => {
    const skip = Skip + Limit;

    const body = {
      categoryId,
      skip,
      limit: Limit,
    };

    getProducts(body);
    setSkip(skip);
    setLoadMore(true);
  }, [categoryId, Skip + Limit, Limit]);

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

  const showFilterdResults = useCallback(
    (filters) => {
      const body = {
        categoryId,
        skip: 0,
        Limit,
        filters,
      };

      getProducts(body);
      setSkip(0);
    },
    [categoryId, Limit],
  );

  const handleFilters = useCallback((filters) => {
    console.log('filters', filters);

    const newFilters = filters;

    showFilterdResults(newFilters);
  }, []);

  return (
    <>
      <div className="products-container">
        <h2 className="products__title">ALL</h2>

        <ul className="products-menus">
          <li>
            <Link to="/shop" className={match.path === '/shop' ? 'active' : undefined}>
              ALL
            </Link>
          </li>
          {cateogry?.map((item) => (
            <li key={item._id}>
              <Link to={item.url} className={match.params.categoryId === item.name ? 'active' : undefined}>
                {item.name}
              </Link>
            </li>
          ))}
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

        {showSrotByButton && <SortByBox list={sortBox} handleFilters={(filters) => handleFilters(filters)} />}
      </div>
      <ul className="card-container">
        {Products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </ul>

      {PostSize >= Limit && (
        <div className="more__btn-container">
          <button type="button" onClick={onClickLoadMore} className="more__btn">
            See More
          </button>
        </div>
      )}
    </>
  );
}

export default ProductsCategory;

ProductsCategory.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};
