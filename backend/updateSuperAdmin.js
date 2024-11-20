// backend/updateSuperAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import SuperAdmin from './models/SuperAdmin.js'; // Adjust the path if necessary

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const updateSuperAdmin = async () => {
  await connectDB();

  try {
    const existingAdmin = await SuperAdmin.findOne({ email: 'superadmin@dealsdray.com' });
    if (!existingAdmin) {
      console.log('SuperAdmin not found');
      process.exit();
    }

    // Manually hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('dealsdray', salt);

    // Update with company-provided credentials
    existingAdmin.password = hashedPassword;

    await existingAdmin.save();
    console.log('SuperAdmin credentials updated successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

updateSuperAdmin();