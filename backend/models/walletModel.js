const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
  {
    driverMailId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    transactionAmount: {
      type: String,
      required: true,
    },
    closingBlance: {
      type: String,
      required: true,
    },
    debitType: {
      type: String,
      required: true,
    },
    currbalance: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
