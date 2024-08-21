const mongoose = require('mongoose');
const { Schema } = mongoose;

const MerchantStatsSchema = new Schema({
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
  }
});

module.exports = MerchantStats = mongoose.model('merchantstatistic', MerchantStatsSchema);
