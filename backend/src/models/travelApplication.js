// src/models/TravelApplication.js
const mongoose = require('mongoose');

const travelApplicationSchema = new mongoose.Schema(
  {
    countryOfResidence: {
      type: String,
      required: [true, 'Country of residence is required'],
      trim: true,
    },
    travelDestination: {
      type: String,
      required: [true, 'Travel destination is required'],
      trim: true,
    },
    nationality: {
      type: String,
      required: [true, 'Nationality is required'],
      trim: true,
    },
  },
  {
    timestamps: true, // gives you createdAt & updatedAt automatically
  }
);

// Optional: for faster queries later
travelApplicationSchema.index({ nationality: 1, travelDestination: 1 });

module.exports = mongoose.model('TravelApplication', travelApplicationSchema);