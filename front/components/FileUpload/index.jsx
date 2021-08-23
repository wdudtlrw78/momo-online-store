import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';

import { SERVER_URL } from '@config/config';
import { UPLOAD_IMAGES_REQUEST } from '@_reducers/product';

function FileUpload({ updateImages }) {
  const dispatch = useDispatch();
  const { upLoadImagesDone, upLoadImagesError, filePath } = useSelector((state) => state.product);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (upLoadImagesDone) {
      setImages([filePath, ...images]);
      updateImages([filePath, ...images]);
    }

    if (upLoadImagesError) {
      alert(upLoadImagesError);
    }
  }, [upLoadImagesDone, upLoadImagesError, filePath]);

  const onDrop = useCallback(
    (files) => {
      const imageFormData = new FormData();
      const config = {
        header: { 'content-type': 'multipart/form-data' },
      };

      imageFormData.append('file', files[0]);

      dispatch({
        type: UPLOAD_IMAGES_REQUEST,
        data: imageFormData,
        config,
      });
    },
    [upLoadImagesDone],
  );

  const onRemoveDrop = useCallback(
    (image) => {
      console.log(image);
      const currentIndex = images.indexOf(image);

      const newImages = [...images];
      newImages.splice(currentIndex, 1);

      setImages(newImages);
      updateImages(newImages);
    },
    [images],
  );

  return (
    <>
      <div className="dropZone-container">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className="dropZone">
                <input {...getInputProps()} />
                <i className="fas fa-plus" />
              </div>
            </section>
          )}
        </Dropzone>

        {images.map((image, i) => (
          <div key={i} className="upload__image-container" onClick={() => onRemoveDrop(image)} role="presentation">
            <img src={`${SERVER_URL}/${image}`} alt="productImages" className="upload__image" />
          </div>
        ))}
      </div>
    </>
  );
}

FileUpload.propTypes = {
  updateImages: PropTypes.func.isRequired,
};

export default FileUpload;
