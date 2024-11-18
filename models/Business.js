import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, required: true },
    documents: [{ type: String }], // Array for multiple document uploads
  },
  { timestamps: true }
);

const Business = mongoose.model('Business', businessSchema);

export default Business;
