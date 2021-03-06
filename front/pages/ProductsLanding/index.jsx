import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { PRODUCT_SERVER } from '@config/config';
import { clothes, price } from '@lib/Datas';
import axios from 'axios';
import ProductCard from '@components/ProductCard';
import CategoryBox from '@components/CategoryBox';
import PriceBox from '@components/PriceBox';
import SearchFeature from '@components/SearchFeature';
import Loader from '@components/Loader';

function ProductsLanding() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(12);
  const [SearchTerm, setSearchTerm] = useState('');
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    category: [],
    price: [],
  });

  const { authLoading } = useSelector((state) => state.user);

  const getProducts = (body) => {
    axios
      .post(`${PRODUCT_SERVER}/shop`, body)
      .then((response) => {
        if (response.data.success) {
          if (body.loadMore) {
            setProducts([...Products, ...response.data.productInfo]);
            setFilters();
          } else {
            console.log('productInfo', response.data.productInfo);
            setProducts(response.data.productInfo);
          }
          setPostSize(response.data.PostSize);
        } else {
          alert('Failed to bring the products.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const onClickLoadMore = () => {
    const skip = Skip + Limit;

    const body = {
      skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
    };

    getProducts(body);
    setSkip(skip);
  };

  const showFilterResults = (filters) => {
    const body = {
      skip: 0,
      limit: Limit,
      filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (const key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    if (category === 'price') {
      const priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilterResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    const body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  if (authLoading) {
    return <Loader />;
  }

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
