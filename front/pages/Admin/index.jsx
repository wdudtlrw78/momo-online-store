import React, { useCallback, useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useSelector } from 'react-redux';
import './styles.scss';
import useInput from '@hooks/useInput';

import FileUpload from '@components/FileUpload';
import axios from 'axios';
import { PRODUCT_SERVER } from '../../config/config';

const Category = [
  { key: 1, value: 'OUTERWEAR' },
  { key: 2, value: 'KNITWEAR' },
  { key: 3, value: 'TOPS' },
  { key: 4, value: 'BOTTOMS' },
];

function Admin({ history }) {
  const [category, onChangeCategory] = useInput('OUTERWEAR');
  const [title, onChangeTitle] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [price, onChangePrice] = useInput(0);
  const [images, setImages] = useState([]);

  const { userData, logOutDone } = useSelector((state) => state.user);

  useEffect(() => {
    if (logOutDone) {
      history.push('/');
    }
  }, [logOutDone]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!category || !title || !description || !price || images.length === 0) {
        return alert('You have to put in all the values.');
      }

      const body = {
        writer: userData._id,
        category,
        title,
        description,
        price,
        images,
      };

      axios.post(`${PRODUCT_SERVER}`, body).then((response) => {
        if (response.data.success) {
          alert('The product upload was successful.');
          history.push('/shop');
        } else {
          alert('Failed to upload product information');
        }
      });
    },
    [category, title, description, price, images],
  );

  const updateImages = useCallback((newImages) => {
    setImages(newImages);
  }, []);

  if (!userData) return null;

  if (!userData?.isAdmin) {
    alert('This page is accessible only to administrators.');
    history.push('/');
  }

  return (
    <div className="admin-container">
      <div>
        <h2 className="admin__title">Admin</h2>
      </div>

      <form onSubmit={onSubmit} className="admin-form">
        {/* DropZone */}
        <FileUpload updateImages={updateImages} />

        <label>Category</label>

        <select onChange={onChangeCategory} value={category} className="admin__category">
          {Category.map((item) => (
            <option key={item.key} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>

        <label>Title</label>
        <input onChange={onChangeTitle} value={title} className="admin__product--title" />

        <label>Description</label>
        <textarea onChange={onChangeDescription} value={description} className="admin__product--description">
          description...
        </textarea>

        <label>Price($)</label>
        <input type="number" onChange={onChangePrice} value={price} className="admin__product--price" />

        <button type="submit" className="admin-submit">
          Upload
        </button>
      </form>
    </div>
  );
}

Admin.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Admin;
