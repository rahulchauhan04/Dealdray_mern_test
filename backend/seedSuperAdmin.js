// seedSuperAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

const seedSuperAdmin = async () => {
  await connectDB();

  try {
    const existingAdmin = await SuperAdmin.findOne({ email: 'superadmin@dealsdray.com' });
    if (existingAdmin) {
      console.log('SuperAdmin already exists');
      process.exit();
    }

    const superAdmin = new SuperAdmin({
      email: 'superadmin@dealsdray.com',
      password: 'dealsdray', // Password will be hashed by the pre-save hook
    });

    await superAdmin.save();
    console.log('SuperAdmin created successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedSuperAdmin();