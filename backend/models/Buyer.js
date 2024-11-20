import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    registrationDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'SubUser' },
    rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'SubUser' },
    approvalDate: { type: Date },
    rejectionDate: { type: Date },
    // Add other fields as necessary
  },
  { timestamps: true }
);

const Buyer = mongoose.model('Buyer', buyerSchema);

export default Buyer;