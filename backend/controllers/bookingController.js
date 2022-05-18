const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");

const getbookings = asyncHandler(async (req, res) => {
  const alldata = await Booking.find();
  res.json(alldata);
});

const addBooking = asyncHandler(async (req, res) => {
  var { driverMailId, date, startTime, totalHours, place, seats, amount } =
    req.body;
  var endTime = parseInt(startTime) + 1;
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
    endTime = parseInt(startTime) + 1;
  }

  if (success) {
    res.status(201).json("Successfully booked");
  } else {
    res.status(400);
    throw new Error("Error occured...");
  }
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.body;
  // console.log(place);
  const bookingExists = await Booking.findOne({ _id: id });

  if (bookingExists) {
    bookingExists.remove();
    res.json("Successfully removed the booking");
  } else {
    res.status(404);
    throw new Error("Booking Not exists");
  }
});

module.exports = { addBooking, getbookings, deleteBooking };
