const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategoryStatsSchema = new Schema({
  _id: {
    type: String, // Category ID or name, e.g., "es_health"
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

module.exports = CategoryStats = mongoose.model('categorystatistic', CategoryStatsSchema);
