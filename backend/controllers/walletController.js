const asyncHandler = require("express-async-handler");
const Wallet = require("../models/walletModel");

const getWalletData = asyncHandler(async (req, res) => {
  const allWalletData = await Wallet.find();
  res.json(allWalletData);
});

const addWallet = asyncHandler(async (req, res) => {
  var { driverMailId, description, transactionAmount, debitType } = req.body;
  var closingBlance = transactionAmount;
  var currbalance = transactionAmount;

  await Wallet.updateMany({ driverMailId: driverMailId });
  const userExists = await Wallet.findOne({ driverMailId: driverMailId });
  if (userExists) {
    if (debitType === "credit") {
      closingBlance =
        parseInt(userExists.currbalance) + parseInt(transactionAmount);
      currbalance =
        parseInt(userExists.currbalance) + parseInt(transactionAmount);
    } else if (debitType === "debit") {
      closingBlance =
        parseInt(userExists.currbalance) - parseInt(transactionAmount);
      currbalance =
        parseInt(userExists.currbalance) - parseInt(transactionAmount);
    }
    if (closingBlance < 0 || currbalance < 0) {
      res.status(404);
      throw new Error(
        "Dont have the required amount in E-wallet, Payment failed"
      );
    }
    await Wallet.updateMany(
      { driverMailId: driverMailId },
      { $set: { currbalance: currbalance } }
    );
  }

  const addedToWallet = await Wallet.create({
    driverMailId,
    description,
    transactionAmount,
    debitType,
    closingBlance,
    currbalance,
  });
  if (addedToWallet) {
    res.status(201).json("Successfully Added To Wallet");
  } else {
    res.status(404);
    throw new Error("E-wallet Payment failed...Please contact Admin");
  }
});

module.exports = { addWallet, getWalletData };
