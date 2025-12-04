
import mongoose from 'mongoose';

// Sub-schema for visa pricing
const visaPricingSchema = new mongoose.Schema({
  tourist: {
    type: String,
    duration: String,
    price: String,
    processing_time: String
  },
  business: {
    type: String,
    duration: String,
    price: String,
    requirements: [String],
    processing_time: String
  },
  student: {
    type: String,
    duration: String,
    price: String,
    requirements: [String],
    processing_time: String
  },
  work: {
    type: String,
    duration: String,
    price: String,
    requirements: [String],
    processing_time: String
  }
});

// Sub-schema for general visa info
const visaInfoSchema = new mongoose.Schema({
  extensions: String,
  overstay_penalty: String,
  health_insurance: String,
  mandatory_docs: [String],
  tips: [String]
});

// Main schema
const visaRequirementSchema = new mongoose.Schema({
  passport: {
    code: { type: String, required: true },
    name: { type: String, required: true },
    currency_code: String
  },
  destination: {
    code: { type: String, required: true },
    name: { type: String, required: true },
    continent: String,
    capital: String,
    currency_code: String,
    currency: String,
    exchange: String,
    passport_validity: String,
    phone_code: String,
    timezone: String,
    population: Number,
    area_km2: Number,
    embassy_url: String
  },
  mandatory_registration: {
    name: String,
    color: String,
    link: String
  },
  visa_rules: {
    primary_rule: {
      name: String,
      duration: String,
      color: String
    },
    secondary_rule: {
      name: String,
      duration: String,
      color: String,
      link: String
    }
  },
  visa_pricing: visaPricingSchema,
  visa_info: visaInfoSchema,
  uniqueKey: { type: String, unique: true, required: true } // e.g., "CN_ID"
}, { timestamps: true });

// Create and export model
const VisaRequirement = mongoose.model('VisaRequirement', visaRequirementSchema);
export default VisaRequirement;