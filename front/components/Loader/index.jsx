import React from 'react';
import loadingGif from '../../public/Loading.gif';

function Loader() {
  return <img src={loadingGif} className="loading" alt="Loading" />;
}

export default Loader;
