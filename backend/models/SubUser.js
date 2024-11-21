import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const subUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  reportingHead: { type: String },
  pinCode: { type: String },
  state: { type: String },
  townArea: { type: String },
  displayName: { type: String },
  otherReportingHead: { type: String },
  deactivationTime: {
    type: Map, // To store both string and date
    of: String, // String for 'days' and formatted date
    default: {},
  },
  assignmentRule: { type: String },
  teamMemberName: { type: String },
  password: { type: String, required: true },
  designation: { type: String, required: true },
  userHierarchy: { type: String, required: true },
  city: { type: String },
  location: { type: String },
  address: { type: String },
  referralCode: { type: String },
  image: { type: String, default: null },
  referralType: { type: String, default: 'B2R' },
  role: { type: String, required: true },
  isActive: { type: Boolean, default: true }, // Ensure isActive field exists with default value
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