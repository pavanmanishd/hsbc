const mongoose = require('mongoose');
const { Schema } = mongoose;

const AmountRangeSchema = new Schema({
  start: {
    type: Number,
    required: true,
  },
  end: {
    type: Number,
    required: true,
  }
});

const TransactionStatsSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalTransactions: {
    type: Number,
    required: true,
  },
  averageAmount: {
    type: Number,
    required: true,
  },
  totalFraud: {
    type: Number,
    required: true,
  },
  totalNonFraud: {
    type: Number,
    required: true,
  },
  amountRange: {
    type: AmountRangeSchema,
    required: true,
  }
});

module.exports = AmountStats = mongoose.model('amountstatistic', TransactionStatsSchema);
