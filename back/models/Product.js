const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    gender: {
      type: String,
      require: true,
    },

    menProductCategory: {
      type: Number,
    },

    womenProductCategory: {
      type: Number,
    },

    title: {
      type: String,
      maxlength: 50,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
      require: true,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    images: {
      type: Array,
      default: [],
      require: true,
    },

    sold: {
      type: Number,
      maxlength: 100,
      defalut: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };