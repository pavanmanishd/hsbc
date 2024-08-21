const AgeStats = require('../models/AgeStats');
const AmountStats = require('../models/AmountStats');
const CategoryStats = require('../models/CategoryStats');
const MerchantStats = require('../models/MerchantStats');
const FraudStats = require('../models/FraudStats');
const GenderStats = require('../models/GenderStats');

exports.getAgeStats = async (req, res) => {
    try {
        const stats = await AgeStats.find();
        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getAmountStats = async (req, res) => {
    try {
        const stats = await AmountStats.find();
        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getCategoryStats = async (req, res) => {
    try {
        const stats = await CategoryStats.find();
        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getMerchantStats = async (req, res) => {
    try {
        const stats = await MerchantStats.find();
        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getGenderStats = async (req, res) => {
    try {
        const stats = await GenderStats.find();
        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getFraudStats = async (req, res) => {
    try {
        const stats = await FraudStats.find();
        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}