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

    writer: {
      type: Schema.Types.ObjectId,
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
      required: true,
      ref: 'User',
    },

    category: {
      type: Number,
      default: 1,
      require: true,
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
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index(
  {
    title: 'text',
    description: 'text',
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
