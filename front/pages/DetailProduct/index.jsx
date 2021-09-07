import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import ProductImage from '@components/ProductImage';
import ProductInfo from '@components/ProductInfo';
import { PRODUCT_SERVER } from '@config/config';
import './styles.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useInput from '@hooks/useInput';

function DetailProductPage({ match }) {
  const productId = match.params.productId;

  const { userData } = useSelector((state) => state.user);

  const [Product, setProduct] = useState({});
  const [Rating, onChangeRating, setRating] = useInput('0');
  const [Comment, setComment] = useState('');
  const [Reviews, setReviews] = useState([]);

  const getReivews = useCallback(
    (body) => {
      axios
        .post(`${PRODUCT_SERVER}/product/${productId}/reviews`, body)
        .then((response) => {
          if (response.data.success) {
            console.log('reviews', Reviews);
            setReviews(response.data.productReview);
          } else {
            alert(response.data.message);
          }
        })
        .catch((err) => alert(err));
    },
    [productId, Reviews],
  );

  useEffect(() => {
    axios
      .get(`${PRODUCT_SERVER}/product/${productId}`)
      .then((response) => {
        if (response.data.success) {
          setProduct(response.data.product[0]);
        }
      })
      .catch((err) => alert(err));
  }, [productId]);

  useEffect(() => {
    axios.get(`${PRODUCT_SERVER}/product/${productId}/reviews`).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setReviews(...response.data.productReview);
      }
    });
  }, [productId]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const body = {
        rating: Rating,
        comment: Comment,
        nickname: userData?.nickname,
        writer: userData?._id,
      };

      getReivews(body);

      setRating(0);
      setComment('');
    },
    [Rating, Comment, userData?.nickname, userData?._id],
  );

  const onChangeComment = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  return (
    <>
      <div className="detail-container">
        {/* productImage */}
        <ProductImage detail={Product} />

        {/* productInfo */}
        <ProductInfo detail={Product} />

        {Reviews.reviews?.map((review, index) => (
          <div className="detail__reviews-container" key={index}>
            <strong>{review.nickname}</strong>

            {review.rating}
            {review.createdAt.substring(0, 10)}
            {review.comment}
          </div>
        ))}

        <div>
          <h3>WRITE A CUSTOMER REVIEW</h3>
        </div>

        {userData?.isAuth ? (
          <form onSubmit={onSubmit}>
            <div className="detail__rating">
              <span>Rating</span>
              <select typeof="select" placeholder="Enter name" value={Rating} onChange={onChangeRating}>
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            <div className="detail__comment">
              <span>Comment</span>
              <textarea onChange={onChangeComment} value={Comment} />
            </div>

            <button type="submit" className="detail__form-btn">
              SUBMIT
            </button>
          </form>
        ) : (
          <p>
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
