import Buyer from '../models/Buyer.js';
import { sendOTP, verifyOTP } from '../services/otpService.js'; // Corrected path
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

export const loginBuyerWithOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  console.log('Received phoneNumber:', phoneNumber); // Debug log

  try {
    // Check if the buyer exists by mobile number
    let buyer = await Buyer.findOne({ mobile: phoneNumber });

    if (!buyer) {
      // Create buyer with required fields
      buyer = new Buyer({
        name: 'Default Name', // Replace with actual data if available
        email: 'default@example.com', // Replace with actual data if available
        mobile: phoneNumber,
        status: 'Pending',
      });
      await buyer.save();

      // Send OTP to the new buyer
      await sendOTP(phoneNumber);

      return res.status(200).json({ message: 'OTP sent to new user', newUser: true });
    }

    // Send OTP to existing user
    await sendOTP(phoneNumber);

    res.status(200).json({ message: 'OTP sent to existing user', newUser: false });
  } catch (error) {
    console.error('Error in loginBuyerWithOTP:', error.message); // Debug log
    res.status(500).json({ message: error.message });
  }
};

export const verifyBuyerOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  console.log('Verifying OTP for:', phoneNumber); // Debug log

  try {
    const verification = verifyOTP(phoneNumber, otp);

    if (!verification.success) {
      return res.status(400).json({ message: verification.message });
    }

    // Find the buyer
    const buyer = await Buyer.findOne({ mobile: phoneNumber });

    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found.' });
    }

    // Update buyer status to 'Active' upon successful OTP verification
    buyer.status = 'Active';
    await buyer.save();

    // Generate JWT token or perform login actions as needed
    const token = generateToken(buyer._id);

    return res.status(200).json({ message: 'OTP verified successfully.', token });
  } catch (error) {
    console.error('Error in verifyBuyerOTP:', error.message); // Debug log
    res.status(500).json({ message: error.message });
  }
};