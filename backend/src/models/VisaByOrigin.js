// src/models/VisaByOrigin.js
import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['string', 'list'],
    required: true,
  },
  text: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { _id: false });

const destinationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  details: { type: ContentSchema, required: true }
}, { _id: false });

const originSchema = new mongoose.Schema({
  country: { type: String, required: true },
  destination: { type: [destinationSchema], default: [] }
}, { _id: false });

const visaByOriginSchema = new mongoose.Schema({
  origin: { type: [originSchema], default: [] }
}, { timestamps: true });

export default mongoose.models.VisaByOrigin || mongoose.model('VisaByOrigin', visaByOriginSchema);