import Buyer from '../models/Buyer.js';
import { sendOTP, verifyOTP } from '../services/otpService.js';
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
    let buyer = await Buyer.findOne({ mobile: phoneNumber });

    if (!buyer) {
      buyer = new Buyer({
        name: 'Default Name',
        email: 'default@example.com',
        mobile: phoneNumber,
        status: 'Pending',
      });
      await buyer.save();

      await sendOTP(phoneNumber);
      return res.status(200).json({ message: 'OTP sent to new user', newUser: true });
    }

    await sendOTP(phoneNumber);
    res.status(200).json({ message: 'OTP sent to existing user', newUser: false });
  } catch (error) {
    console.error('Error in loginBuyerWithOTP:', error.message);
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

    const buyer = await Buyer.findOne({ mobile: phoneNumber });

    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found.' });
    }

    buyer.status = 'Active';
    await buyer.save();

    const token = generateToken(buyer._id);

    return res.status(200).json({ message: 'OTP verified successfully.', token });
  } catch (error) {
    console.error('Error in verifyBuyerOTP:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const approveBuyer = async (req, res) => {
  const { buyerId } = req.body;

  try {
    const buyer = await Buyer.findById(buyerId);

    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    buyer.status = 'Approved';
    await buyer.save();

    res.status(200).json({ message: 'Buyer approved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingApprovals = async (req, res) => {
  try {
    const { approvalStatus } = req.query;
    console.log('Approval Status:', approvalStatus); // Debug log

    const buyers = await Buyer.find({ status: approvalStatus });
    console.log('Buyers:', buyers); // Debug log
    res.status(200).json({ registrations: buyers });
  } catch (error) {
    console.error('Error fetching pending approvals:', error.message); // Debug log
    res.status(500).json({ message: error.message });
  }
};

export const getApprovedBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find({ status: 'Approved' });
    res.status(200).json({ registrations: buyers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};