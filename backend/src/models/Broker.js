import mongoose from 'mongoose';

const brokerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ['broker', 'admin'],
      default: 'broker',
    },
  },
  {
    timestamps: true,
  }
);

const Broker = mongoose.model('Broker', brokerSchema);

export default Broker;
