import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    broker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Broker',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      //   required: true,
    },
    price: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['rent', 'sale'],
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['active', 'sold'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
