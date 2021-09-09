import React, { useCallback } from 'react';
import './styles.scss';
import PropTyeps from 'prop-types';
import { SERVER_URL } from '../../config/config';

function UserCardBlock({ products, removeItem }) {
  const renderCartImage = useCallback((images) => {
    if (images?.length > 0) {
      const image = images[0];
      return `${SERVER_URL}/${image}`;
    }
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Product Image</th>
          <th>Product Quantity</th>
          <th>Product Price</th>
          <th>Remove from Cart</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product._id}>
            <td width="25%">
              <img className="cart__image" alt="product" src={renderCartImage(product.images)} />
            </td>
            <td width="25%">{product.quantity} EA</td>
            <td width="25%">${product.price} USD</td>
            <td width="25%">
              <button type="button" onClick={() => removeItem(product._id)} className="cart__remove-btn">
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

UserCardBlock.propTypes = {
  products: PropTyeps.array.isRequired,
  removeItem: PropTyeps.func.isRequired,
};

export default UserCardBlock;
