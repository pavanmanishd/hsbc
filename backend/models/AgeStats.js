const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    totalTransactions: {
        type: Number,
        required: true
    },
    averageAmount: {
        type: Number,
        required: true
    },
    totalFraud: {
        type: Number,
        required: true
    },
    totalNonFraud: {
        type: Number,
        required: true
    }
});

module.exports = AgeStats = mongoose.model('agestatistic', statisticsSchema);
