// backend/scripts/updateSubUserPassword.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SubUser from '../models/SubUser.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Removed deprecated options
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const updateSubUserPassword = async () => {
  await connectDB();

  try {
    const subUser = await SubUser.findOne({ email: 'testuser@example.com' });
    if (!subUser) {
      console.log('SubUser not found');
      process.exit();
    }

    // **Set the plain password**
    subUser.password = 'dealsdray';

    await subUser.save();
    console.log('SubUser password updated and hashed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

updateSubUserPassword();