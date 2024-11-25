import dotenv from 'dotenv';
dotenv.config();

import SuperAdmin from '../models/SuperAdmin.js';
import SubUser from '../models/SubUser.js';
import jwt from 'jsonwebtoken';

export const loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login Attempt:', email); // Debug log

  try {
    // Find SuperAdmin by email
    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) {
      console.log('SuperAdmin not found'); // Debug log
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Stored Hashed Password:', superAdmin.password); // Debug log

    // Compare the provided password with the hashed password
    const isMatch = await superAdmin.comparePassword(password);
    console.log('Password Match:', isMatch); // Debug log

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: superAdmin._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful, token generated:', token); // Debug log

    // Return the token and a success message
    return res.status(200).json({ token, user: { role: 'SuperAdmin' }, message: 'Login successful' });
  } catch (error) {
    console.error('Login Error:', error.message); // Debug log
    return res.status(500).json({ message: error.message });
  }
};

export const loginSubUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find SubUser by email
    const subUser = await SubUser.findOne({ email });
    if (!subUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await subUser.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: subUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Prepare user data without the password
    const userData = {
      _id: subUser._id,
      name: subUser.name,
      email: subUser.email,
      role: subUser.role,
      __v: subUser.__v,
    };

    // Return the token and user details
    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error('SubUser Login Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};