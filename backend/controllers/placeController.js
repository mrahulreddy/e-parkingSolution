const asyncHandler = require("express-async-handler");
const Place = require("../models/placeModel");

const getPlaces = asyncHandler(async (req, res) => {
  const allplacedata = await Place.find();
  res.json(allplacedata);
});

const addPlace = asyncHandler(async (req, res) => {
  const { ownerMailId, ownerName, placeName, nos, aph, stime, etime } =
    req.body;

  const place = await Place.create({
    ownerMailId,
    ownerName,
    placeName,
    nos,
    aph,
    stime,
    etime,
  });

  if (place) {
    res.status(201).json({
      _id: place._id,
      placeName: place.placeName,
    });
  } else {
    res.status(400);
    throw new Error("Error occured...");
  }
});

module.exports = { addPlace, getPlaces };
