import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import ProductImage from '@components/ProductImage';
import ProductInfo from '@components/ProductInfo';
import { PRODUCT_SERVER } from '@config/config';
import './styles.scss';

function DetailProductPage({ match }) {
  const productId = match.params.productId;

  const [Product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`${PRODUCT_SERVER}/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          setProduct(response.data.product[0]);
        }
      })
      .catch((err) => alert(err));
  }, [productId]);

  return (
    <div className="detail-container">
      {/* productImage */}
      <ProductImage detail={Product} />

      {/* productInfo */}
      <ProductInfo detail={Product} />
    </div>
  );
}

DetailProductPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default DetailProductPage;
