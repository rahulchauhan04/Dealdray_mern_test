import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const subUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: String,
  email: { type: String, required: true, unique: true },
  mobile: String,
  reportingHead: String,
  role: { type: String, required: true, enum: ['BOT Checker', 'BOT Approval Agent'] },
  password: { type: String, required: true },
  // Add these fields
  designation: String,
  userType: String,
  referralCode: String,
});

// Pre-save hook to hash the password
subUserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare passwords
subUserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const SubUser = mongoose.model('SubUser', subUserSchema);
export default SubUser;