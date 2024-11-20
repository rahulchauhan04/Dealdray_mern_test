import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Buyer from '../models/Buyer.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedBuyers = async () => {
  await connectDB();

  const buyers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '1234567890',
      status: 'Pending',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      mobile: '0987654321',
      status: 'Approved',
    },
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      mobile: '1122334455',
      status: 'Rejected',
    },
    // Add more sample buyers as needed
  ];

  try {
    await Buyer.insertMany(buyers);
    console.log('Sample buyers inserted successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedBuyers();