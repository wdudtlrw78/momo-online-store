import React from 'react';
import loadingGif from '../../images/Loading.gif';

function Loader() {
  return (
    <div style={{ width: '100%', maxWidth: '100rem', padding: '0 1rem', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={loadingGif} className="loading" alt="Loading" />
      </div>
    </div>
  );
}

export default Loader;
