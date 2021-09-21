import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import ProductImage from '@components/ProductImage';
import ProductInfo from '@components/ProductInfo';
import Ratings from '@components/Ratings';
import { PRODUCT_SERVER } from '@config/config';
import './styles.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useInput from '@hooks/useInput';
import Loader from '@components/Loader';

function DetailProductPage({ match }) {
  const productId = match.params.productId;

  const { userData, authLoading } = useSelector((state) => state.user);

  const [Product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [Rating, onChangeRating, setRating] = useInput('');
  const [Comment, onChangeComment, setComment] = useInput('');
  const [Reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${PRODUCT_SERVER}/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          setProduct(response.data.product[0]);
        }
      })
      .catch((err) => console.log(err));
  }, [productId]);

  useEffect(() => {
    axios
      .get(`${PRODUCT_SERVER}/product/${productId}/reviews`)
      .then((response) => {
        if (response.data.success) {
          setReviews(...response.data.productReview);
        }
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const commentRef = useRef(null);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const body = {
        rating: Rating,
        comment: Comment,
        nickname: userData?.nickname,
        writer: userData?._id,
      };

      if (!Rating || !Comment) {
        alert('You have to put in all the values.');
        commentRef.current.focus();
      } else {
        alert('Review added');
        axios
          .post(`${PRODUCT_SERVER}/product/${productId}/reviews`, body)
          .then((response) => {
            if (response.data.success) {
              setReviews(response.data.productReview);
            }
          })
          .catch((err) => alert(err));
      }

      setRating(0);
      setComment('');
    },
    [Rating, Comment, userData],
  );

  if (authLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="detail-container">
        {/* productImage */}
        <ProductImage detail={Product} />

        {/* productInfo */}
        <div className="detail__info-container">
          <ProductInfo detail={Product} />
        </div>
      </div>

      <div className="detail__reviews-container">
        <h3 className="detail__reviews__title">Customer reviews</h3>
        {Reviews.reviews?.map((review, index) => (
          <div className="detail__reviews" key={index}>
            <strong className="detail__reviews__nickname">{review.nickname}</strong>

            <Ratings value={review.rating} />
            <span className="detial__reviews__date">{review.createdAt.substring(0, 10)}</span>
            <p className="detail__reivew">{review.comment}</p>
          </div>
        ))}

        <h3 className="detail__customer__title">Write a customer review</h3>

        {userData?.isAuth ? (
          <form onSubmit={onSubmit} className="detail__customer-form">
            <div className="detail__customer__rating-container">
              <span className="detail__customer__rating">Rating</span>
              <select
                typeof="select"
                value={Rating}
                onChange={onChangeRating}
                className="detail__customer__rating-select"
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            <div className="detail__customer__review-container">
              <span className="detail__customer__reivew">Comment</span>
              <textarea
                rows="5"
                cols="33"
                onChange={onChangeComment}
                value={Comment}
                ref={commentRef}
                className="detail__customer__review-textarea"
              />
            </div>

            <button type="submit" className="detail__customer__review-btn">
              SUBMIT
            </button>
          </form>
        ) : (
          <p className="detail__customer__login">
            Please <Link to="/login">Sign In</Link> to write a review
          </p>
        )}
      </div>
    </>
  );
}

DetailProductPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default DetailProductPage;
