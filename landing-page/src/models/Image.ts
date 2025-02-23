// src/models/Image.ts
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  driveLink: {
    type: String,
    required: true,
    unique: true  // Make driveLink unique instead
  },
  type: {
    type: String,
    enum: ['Classification', 'Segmentation'],
    required: true,
  },
  reviews: [{
    value: mongoose.Schema.Types.Mixed
  }],
  totalReviews: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: false,
  strict: true
});

// Drop any existing indexes before creating new ones
const Model = mongoose.models.Image || mongoose.model('Image', ImageSchema);
Model.collection.dropIndexes().catch(err => console.log('No indexes to drop'));

export default Model;