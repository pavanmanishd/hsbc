const mongoose = require('mongoose');
const { Schema } = mongoose;

const FraudStatsSchema = new Schema({
  _id: {
    type: Number, // Assuming _id is a number
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


module.exports = FraudStats = mongoose.model('fraudstatistic', FraudStatsSchema);
