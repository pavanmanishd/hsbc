const express = require('express');
const router = express.Router();
const { getTransactions, getTransactionById, getTransactionsByFilter,addTransaction } = require('../controllers/transactionsController');
const auth = require('../middleware/auth');

router.get('/', auth, getTransactions);
router.post('/', auth, addTransaction);
router.get('/:id', auth, getTransactionById);
router.post('/filter', auth, getTransactionsByFilter);

module.exports = router;