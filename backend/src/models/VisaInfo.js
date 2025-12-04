
import mongoose from 'mongoose';

const contentItemSchema = new mongoose.Schema({
  text: {
    type: mongoose.Schema.Types.Mixed, // String or Array
    required: true
  },
  type: {
    type: String,
    enum: ['string', 'list'],
    required: true
  }
}, { _id: false });

const destinationSchema = new mongoose.Schema({
  text: { type: mongoose.Schema.Types.Mixed, required: true },
  type: { type: String, enum: ['string', 'list'], required: true }
}, { _id: false });

const nationalityInfoSchema = new mongoose.Schema({
  destination: {
    type: Map,
    of: destinationSchema,
    default: {}
  },
  passport_and_details: {
    type: contentItemSchema,
    required: true
  }
}, { _id: false });

const visaInfoSchema = new mongoose.Schema({
  nationality: {
    type: Map,
    of: nationalityInfoSchema,
    default: {}
  }
}, { timestamps: true });

// Only one document in the collection
// visaInfoSchema.index({ _id: true });

export default mongoose.models.VisaInfo || mongoose.model('VisaInfo', visaInfoSchema);