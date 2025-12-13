// src/models/VisaByOrigin.js
import mongoose from 'mongoose';

// Schema for visa details - supports both string and array of strings
const DetailsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['string', 'list'] // Only allow these two types
  },
  text: {
    type: mongoose.Schema.Types.Mixed, // Can be String or Array of Strings
    required: true
  }
}, { _id: false });

// Schema for each destination country
const destinationSchema = new mongoose.Schema({
  country: { 
    type: String, 
    required: true 
  },
  details: { 
    type: DetailsSchema, 
    required: true 
  }
}, { _id: false });

// Schema for origin country
const originSchema = new mongoose.Schema({
  country: { 
    type: String, 
    required: true 
  },
  nationality: { 
    type: String, 
    required: true 
  },
  destination: { 
    type: [destinationSchema], 
    default: [] 
  }
}, { _id: false });

// Main schema
const visaByOriginSchema = new mongoose.Schema({
  origin: { 
    type: [originSchema], 
    default: [] 
  }
}, { timestamps: true });

export default mongoose.models.VisaByOrigin || mongoose.model('VisaByOrigin', visaByOriginSchema);