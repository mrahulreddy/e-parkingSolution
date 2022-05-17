const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");

const addBooking = asyncHandler(async (req, res) => {
  const { driverMailId, date, startTime, totalHours, place, seats, amount } =
    req.body;
  var endTime = startTime + 1;
  var success = false;
  for (let index = 0; index < totalHours; index++) {
    const booking = await Booking.create({
      driverMailId,
      date,
      startTime,
      endTime,
      place,
      seats,
      amount,
    });

    success = true;
    startTime = endTime;
    endTime = startTime + 1;
  }

  if (success) {
    res.status(201).json("Successfully booked");
  } else {
    res.status(400);
    throw new Error("Error occured...");
  }
});

module.exports = { addBooking };
