const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  step: Number,
  customer: String,
  age: Number,
  gender: String,
  zipcodeOri: String,
  merchant: String,
  zipMerchant: String,
  category: String,
  amount: Number,
  fraud: Boolean
});

module.exports = Transaction = mongoose.model('transaction', transactionSchema);
