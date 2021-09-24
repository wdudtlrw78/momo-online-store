import React, { useCallback, useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useSelector } from 'react-redux';
import { SERVER_URL } from '@config/config';
import '@components/UserCardBlock/styles.scss';
import Loader from '@components/Loader';

function History({ history }) {
  const { userData, authLoading } = useSelector((state) => state.user);

  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (userData?.history.length > 0) {
      setShowHistory(true);
    }
  }, [userData]);

  const renderhistoryImage = useCallback(
    (images) => {
      if (userData?.isAuth && images?.length > 0) {
        const image = images[0];
        return `${SERVER_URL}/${image}`;
      }
    },
    [userData],
  );

  if (authLoading) {
    return <Loader />;
  }

  if (!userData?.isAuth) {
    alert('You need to log in.');
    history.replace('/login');
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 style={{ marginBottom: '4rem', fontSize: '1.5rem', fontWeight: '500' }}>History</h1>
        {showHistory ? (
          <div style={{ width: '100%' }}>
            <table>
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Order Number</th>
                  <th>Product Quantity</th>
                  <th>Product Price</th>
                </tr>
              </thead>
              <tbody>
                {userData?.history.map((product, index) => (
                  <tr key={index}>
                    <td width="25%">
                      <img className="history__image" alt="product" src={renderhistoryImage(product.images)} />
                    </td>
                    <td width="25%">{product.paymentId.substr(0, 12)}</td>
                    <td width="25%">{product.quantity} EA</td>
                    <td width="25%">${product.price} USD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <p>There is no order details.</p>
          </div>
        )}
      </div>
    </>
  );
}

History.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default History;
