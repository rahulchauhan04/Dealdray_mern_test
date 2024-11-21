// scripts/updateSubUserFields.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SubUser from '../models/SubUser.js'; // Adjust the path if necessary

dotenv.config();

const updateSubUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const defaultValues = {
      department: '',
      reportingHead: '',
      pinCode: '',
      state: '',
      townArea: '',
      displayName: '',
      otherReportingHead: '',
      deactivationTime: null,
      assignmentRule: '',
      teamMemberName: '',
      designation: '',
      userHierarchy: '',
      city: '',
      location: '',
      address: '',
      referralType: 'B2R',
      image: null,
      referralCode: '',
      role: '',
    };

    const subUsers = await SubUser.find();

    for (const subUser of subUsers) {
      let needsUpdate = false;
      for (const [field, defaultValue] of Object.entries(defaultValues)) {
        if (subUser[field] === undefined) {
          subUser[field] = defaultValue;
          needsUpdate = true;
        }
      }
      if (needsUpdate) {
        await subUser.save();
        console.log(`Updated SubUser: ${subUser._id}`);
      }
    }

    console.log('All subuser records updated successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating subusers:', error);
    process.exit(1);
  }
};

updateSubUsers();