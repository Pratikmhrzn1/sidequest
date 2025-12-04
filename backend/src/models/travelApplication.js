import mongoose from 'mongoose';

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
    status:{
      type: String,
      enum: ['pending','in-process','approved','rejected'],
      default: 'pending'
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

// Optional index for faster queries
travelApplicationSchema.index({ nationality: 1 });
travelApplicationSchema.index({ status: 1});
travelApplicationSchema.index({createdAt: -1});

const TravelApplication = mongoose.model('TravelApplication', travelApplicationSchema);

export default TravelApplication;
