import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import ProductCard from '@components/ProductCard';
import axios from 'axios';
import { PRODUCT_SERVER } from '@config/config';
import { clothes, price } from '@lib/Datas';
import CategoryBox from '@components/CategoryBox';
import PriceBox from '@components/PriceBox';
import SearchFeature from '@components/SearchFeature';

function ProductsLanding() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(12);
  const [LoadMore, setLoadMore] = useState(false);
  const [SearchTerm, setSearchTerm] = useState('');
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    category: [],
    price: [],
  });

  const getProducts = useCallback(
    (body) => {
      axios.post(`${PRODUCT_SERVER}/shop`, body).then((response) => {
        if (response.data.success) {
          console.log('success', response.data.productInfo);
          if (LoadMore) {
            setProducts([...Products, ...response.data.productInfo]);
            console.log('ladmore', response.data.productInfo);
          } else {
            setProducts(response.data.productInfo);
          }
          setPostSize(response.data.PostSize);
        } else {
          alert('Failed to bring the products.');
        }
      });
    },
    [LoadMore, Products],
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
  }, [Skip, Limit]);

  const showFilterResults = useCallback(
    (filters) => {
      const body = {
        skip: 0,
        limit: Limit,
        filters,
      };

      getProducts(body);
      setSkip(0);
    },
    [Limit],
  );

  const handlePrice = useCallback((value) => {
    const data = price;
    let array = [];

    for (const key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  }, []);

  const handleFilters = useCallback(
    (filters, category) => {
      const newFilters = { ...Filters };

      newFilters[category] = filters;
      console.log('filters', filters);

      if (category === 'price') {
        const priceValues = handlePrice(filters);
        newFilters[category] = priceValues;
      }

      console.log('newFilters', newFilters);
      showFilterResults(newFilters);
      setFilters(newFilters);
    },
    [Filters],
  );

  const updateSearchTerm = useCallback(
    (newSearchTerm) => {
      const body = {
        skip: 0,
        limit: Limit,
        filters: Filters,
        searchTerm: newSearchTerm,
      };

      setSkip(0);
      setSearchTerm(newSearchTerm);
      getProducts(body);
    },
    [Limit, Filters],
  );

  return (
    <>
      <div className="products-container">
        <h2 className="products__title">SHOP</h2>

        <ul className="products__categorys">
          <li>
            <CategoryBox list={clothes} handleFilters={(filters) => handleFilters(filters, 'category')} />
          </li>
          <li>
            <PriceBox list={price} handleFilters={(filters) => handleFilters(filters, 'price')} />
          </li>
        </ul>
      </div>

      <SearchFeature updateSearchTerm={updateSearchTerm} />

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

export default ProductsLanding;
