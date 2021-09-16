const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: Array,
      default: [],
    },

    data: {
      type: Array,
      default: [],
    },

    product: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model('payment', paymentSchema);

module.exports = { Payment };
