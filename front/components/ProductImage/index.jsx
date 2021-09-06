import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { SERVER_URL } from '@config/config';
import './styles.scss';

function ProductImage({ detail }) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (detail.images && detail.images.length > 0) {
      const images = [];

      detail.images.map((item) => {
        images.push({
          original: `${SERVER_URL}/${item}`,
          thumbnail: `${SERVER_URL}/${item}`,
        });

        return images;
      });
      setImages(images);
    }
  }, [detail]);

  return (
    <div className="detail__images-container">
      <ImageGallery items={Images} showPlayButton={false} />
    </div>
  );
}

ProductImage.propTypes = {
  detail: PropTypes.shape({
    images: PropTypes.array,
  }).isRequired,
};

export default ProductImage;
