import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useSelector } from 'react-redux';

import './styles.scss';
import { Link, NavLink } from 'react-router-dom';
import { MenMenuItems, WomenMenuItems } from '../../lib/MenuItems';
import ProductCard from '../../components/ProductCard';
import SortByBox from '../../components/SortByBox';

function ProductsCategory({ match }) {
  const gender = match.params.gender;
  const categoryId = match.params.categoryId;

  const menuItem = gender === 'men' ? MenMenuItems : WomenMenuItems;
  const { productsInfo } = useSelector((state) => state.product);

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
              gender === product.gender &&
              (categoryId === product.womenProductCategory || categoryId === product.menProductCategory) && (
                <ProductCard key={product._id} product={product} gender={gender} />
              ),
          )
          .reverse()}
      </ul>
    </>
  );
}

export default ProductsCategory;

ProductsCategory.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};
