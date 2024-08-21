const Transaction = require("../models/Transaction");

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await Transaction.countDocuments().exec())) {
      results.next = {
        page: Number(page) + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: Number(page) - 1,
        limit: limit,
      };
    }

    results.results = await Transaction.find()
      .limit(limit)
      .skip(startIndex)
      .exec();

    return res.status(200).json({
      success: true,
      count: results.results.length,
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get transactions by filter
// @route   POST /api/transactions/filter
// @access  Private

exports.getTransactionsByFilter = async (req, res) => {
  try {
    const {
      step,
      customer,
      ageRange,
      gender,
      zipcodeOri,
      merchant,
      zipMerchant,
      category,
      amountRange,
      fraud,
    } = req.body;

    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let query = {};

    if (step) {
      query.step = step;
    }

    if (customer) {
      query.customer = customer;
    }

    if (ageRange) {
      query.age = { $gte: ageRange[0], $lte: ageRange[1] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (zipcodeOri) {
      query.zipcodeOri = zipcodeOri;
    }

    if (merchant) {
      query.merchant = merchant;
    }

    if (zipMerchant) {
      query.zipMerchant = zipMerchant;
    }

    if (category) {
      query.category = category;
    }

    if (amountRange) {
      query.amount = { $gte: amountRange[0], $lte: amountRange[1] };
    }

    if (fraud) {
      query.fraud = fraud;
    }

    const results = {};

    if (endIndex < (await Transaction.countDocuments(query).exec())) {
        results.next = {
            page: Number(page) + 1,
            limit: limit,
        };
        }

        if (startIndex > 0) {
        results.previous = {
            page: Number(page) - 1,
            limit: limit,
        };

    }

    results.results = await Transaction.find(query)
      .limit(limit)
      .skip(startIndex)
      .exec();

    return res.status(200).json({
        success: true,
        count: results.results.length,
        data: results,
        });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc   Add transaction
// @route  POST /api/transactions
// @access Private
exports.addTransaction = async (req, res) => {
  try {
    const {
      step,
      customer,
      age,
      gender,
      zipcodeOri,
      merchant,
      zipMerchant,
      category,
      amount,
      fraud,
    } = req.body;

    const transaction = await Transaction.create({
      step,
      customer,
      age,
      gender,
      zipcodeOri,
      merchant,
      zipMerchant,
      category,
      amount,
      fraud,
    });

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ error: messages });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};
