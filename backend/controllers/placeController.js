const asyncHandler = require("express-async-handler");
const Place = require("../models/placeModel");

const getPlaces = asyncHandler(async (req, res) => {
  const allplacedata = await Place.find();
  res.json(allplacedata);
});

const updateNbs = asyncHandler(async (req, res) => {
  const { placeName, nos } = req.body;

  const placeExists = await Place.findOne({ placeName });

  if (placeExists) {
    // console.log(placeExists);
    // console.log(parseInt(placeExists.nbs) + parseInt(nbs));
    placeExists.nbs = parseInt(placeExists.nbs) + parseInt(nos);
    const updatedPlace = await placeExists.save();
    res.json(updatedPlace);
  } else {
    res.status(404);
    throw new Error("Place Not exists");
  }
});

const addPlace = asyncHandler(async (req, res) => {
  const { ownerMailId, ownerName, placeName, nos, aph, stime, etime } =
    req.body;

  const placeExists = await Place.findOne({ placeName });

  if (placeExists) {
    res.status(404);
    throw new Error("Place already exists");
  }
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

module.exports = { addPlace, getPlaces, updateNbs };
