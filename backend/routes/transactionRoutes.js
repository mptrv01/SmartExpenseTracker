const express = require("express");
const Transaction = require("../models/Transaction");
const { protect } = require("../src/middleware/authMiddleware");

const router = express.Router();

// Create transaction
router.post("/", protect, async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get transactions + search + filters
router.get("/", protect, async (req, res) => {
  try {
    const { category, search, startDate, endDate } = req.query;

    let filter = {
      userId: req.user.id,
    };

    // filter by category
    if (category) {
      filter.category = category;
    }

    // search in description
    if (search) {
      filter.description = {
        $regex: search,
        $options: "i",
      };
    }

    // filter by date
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    const transactions = await Transaction.find(filter).sort({
      date: -1,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update transaction
router.put("/:id", protect, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete transaction
router.delete("/:id", protect, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Recent transactions
router.get("/recent", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    })
      .sort({ date: -1 })
      .limit(5);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Dashboard statistics
router.get("/stats", protect, async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: "$type",
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    let income = 0;
    let expense = 0;

    stats.forEach((item) => {
      if (item._id === "income") {
        income = item.total;
      }

      if (item._id === "expense") {
        expense = item.total;
      }
    });

    res.json({
      income,
      expense,
      balance: income - expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Chart data
router.get("/chart-data", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const [expensesByCategory, monthlyExpenses] = await Promise.all([
      Transaction.aggregate([
        {
          $match: {
            userId,
            type: "expense",
          },
        },
        {
          $group: {
            _id: "$category",
            amount: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            amount: -1,
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            amount: 1,
          },
        },
      ]),

      Transaction.aggregate([
        {
          $match: {
            userId,
            type: "expense",
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m",
                date: "$date",
              },
            },
            amount: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id",
            amount: 1,
          },
        },
      ]),
    ]);

    res.json({
      expensesByCategory,
      monthlyExpenses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;