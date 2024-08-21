const express = require('express');
const router = express.Router();
const { 
    getAgeStats, 
    getAmountStats, 
    getCategoryStats, 
    getMerchantStats, 
    getGenderStats, 
    getFraudStats
 } = require('../controllers/statsController');

router.get('/age', getAgeStats);
router.get('/amount', getAmountStats);
router.get('/category', getCategoryStats);
router.get('/merchant', getMerchantStats);
router.get('/gender', getGenderStats);
router.get('/fraud', getFraudStats);

module.exports = router;