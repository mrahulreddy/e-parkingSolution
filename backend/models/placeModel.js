const mongoose = require("mongoose");

const placeSchema = mongoose.Schema(
  {
    ownerMailId: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    placeName: {
      type: String,
      required: true,
    },
    nos: {
      type: String,
      required: true,
    },
    aph: {
      type: String,
      required: true,
    },
    stime: {
      type: String,
      required: true,
    },
    etime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
