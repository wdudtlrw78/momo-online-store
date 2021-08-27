import React, { useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PRODUCTS_REQUEST } from '@_reducers/product';
import './styles.scss';
import { Link, NavLink } from 'react-router-dom';
import { MenMenuItems, WomenMenuItems } from '../../lib/MenuItems';
import ProductCard from '../../components/ProductCard';
import SortByBox from '../../components/SortByBox';

function ProductsLanding({ match }) {
  const gender = match.params.gender;
  const categoryId = match.params.categoryId;

  const menuItem = gender === 'men' ? MenMenuItems : WomenMenuItems;
  const { productsInfo } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
      data: gender,
    });
  }, []);

  return (
    <>
      <div className="products-container">
        <h2 className="products__title">{categoryId?.toUpperCase() || 'ALL'}</h2>
        <ul className="products-menus">
          <li>
            <Link to={`/${gender}`} className={categoryId ? undefined : 'active'}>
              ALL
            </Link>
          </li>
          {menuItem.map((item) => (
            <li key={item.key}>
              <NavLink to={item.url} activeClassName="active">
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <SortByBox />
      </div>
      <ul className="card-container">
        {productsInfo
          ?.map(
            (product) =>
              gender === product.gender && <ProductCard key={product._id} product={product} gender={gender} />,
          )
          .reverse()}
      </ul>
    </>
  );
}

export default ProductsLanding;

ProductsLanding.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};
