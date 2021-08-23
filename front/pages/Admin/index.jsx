import React, { useCallback, useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import useInput from '@hooks/useInput';
import { MenMenuItems, WomenMenuItems } from '@lib/MenuItems';
import FileUpload from '@components/FileUpload';
import { STORAGE_PRODUCT_INFO_REQUEST } from '@_reducers/product';

function Admin(props) {
  const dispatch = useDispatch();

  const [gender, onChangeGender, setGender] = useInput('Men');
  const [menProductCategory, onChangeMenProductCategory, setMenProductCategory] = useInput(1);
  const [womenProductCategory, onChangeWomenProductCategory, setWomenProductCategory] = useInput(1);
  const [title, onChangeTitle, setTitle] = useInput('');
  const [description, onChangeDescription, setDescription] = useInput('');
  const [price, onChangePrice, setPrice] = useInput(0);
  const [images, setImages] = useState([]);

  const { userData } = useSelector((state) => state.user);
  const { storageProductInfoDone, storageProductInfoError } = useSelector((state) => state.product);

  useEffect(() => {
    if (storageProductInfoDone) {
      alert('Product information upload succeeded');
      props.history.push('/');
    }
  }, [storageProductInfoDone]);

  useEffect(() => {
    if (storageProductInfoError) {
      setGender('Man');
      setMenProductCategory(1);
      setWomenProductCategory(1);
      setTitle('');
      setDescription('');
      setPrice('');
    }
  }, [storageProductInfoError]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (
        !gender ||
        !menProductCategory ||
        !womenProductCategory ||
        !title ||
        !description ||
        !price ||
        !images.length === 0
      ) {
        return alert('You have to put in all the values.');
      }

      dispatch({
        type: STORAGE_PRODUCT_INFO_REQUEST,
        data: {
          writer: userData?._id,
          gender,
          menProductCategory,
          womenProductCategory,
          title,
          description,
          price,
          images,
        },
      });
    },
    [
      userData._id,
      gender,
      menProductCategory,
      menProductCategory,
      womenProductCategory,
      title,
      description,
      price,
      images,
    ],
  );

  const updateImages = useCallback((newImages) => {
    setImages(newImages);
  }, []);

  if (!userData) return null;

  if (!userData?.isAdmin) {
    console.log(!userData?.isAdmin);
    alert('This page is accessible only to administrators.');
    props.history.push('/');
  }

  return (
    <div className="admin-container">
      <div>
        <h2 className="admin__title">Admin</h2>
      </div>

      <form onSubmit={onSubmit} className="admin-form">
        {/* DropZone */}
        <FileUpload updateImages={updateImages} />

        <label>Gender</label>
        <select onChange={onChangeGender} value={gender} className="admin__select--gender">
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>

        <label>Category</label>
        {gender === 'Men' ? (
          <select onChange={onChangeMenProductCategory} value={menProductCategory} className="admin__category--men">
            {MenMenuItems.map((item) => (
              <option key={item.key} value={item.key}>
                {item.title}
              </option>
            ))}
          </select>
        ) : (
          <select
            onChange={onChangeWomenProductCategory}
            value={womenProductCategory}
            className="admin__category--women"
          >
            {WomenMenuItems.map((item) => (
              <option key={item.key} value={item.key}>
                {item.title}
              </option>
            ))}
          </select>
        )}

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
