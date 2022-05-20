const asyncHandler = require("express-async-handler");
const Wallet = require("../models/walletModel");

const stripe = require("stripe")(
  "sk_test_51L0YjrFztLACX4MrCHl3lirNQs0Rdtr2Z6yesOg70f45reM7NGbQJcPnShxcED5GajOLfmgGK92Y5oyP9qIlpzjA00P5X5BLvs"
);

const getWalletData = asyncHandler(async (req, res) => {
  const allWalletData = await Wallet.find();
  res.json(allWalletData);
});

const addMoney = asyncHandler(async (req, res) => {
  var { transactionAmount, debitType } = req.body;
  var pence = parseInt(transactionAmount) * 100;
  if (debitType === "credit") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: {
                name: "Deposit to Rahul E-Parking wallet",
              },
              unit_amount: pence,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.CLIENT_URL}/wallet?st=` + transactionAmount,
        cancel_url: `${process.env.CLIENT_URL}/wallet?ft=` + transactionAmount,
      });

      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
});

const transactMoney = asyncHandler(async (req, res) => {
  var { driverMailId, description, transactionAmount, debitType } = req.body;
  var closingBlance = transactionAmount;
  var currbalance = transactionAmount;

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
  } else {
    if (debitType === "debit") {
      res.status(404);
      throw new Error(
        "Dont have the required amount in E-wallet, Payment failed"
      );
    }
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

module.exports = { addMoney, getWalletData, transactMoney };
