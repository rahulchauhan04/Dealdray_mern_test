import express from 'express';
import { loginBuyerWithOTP, verifyBuyerOTP, approveBuyer, getPendingApprovals, getApprovedBuyers } from '../controllers/buyerController.js';
import { sendOTP, verifyOTP } from '../services/otpService.js';

const router = express.Router();

console.log('Buyer Routes Loaded'); // Debug log

// POST /api/buyers/login
router.post('/login', loginBuyerWithOTP);

// POST /api/buyers/verify-otp
router.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;
  const result = verifyOTP(phoneNumber, otp);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
});

// POST /api/buyer-approvals/approve
router.post('/buyer-approvals/approve', approveBuyer);

// GET /api/buyer-approvals
router.get('/buyer-approvals', getPendingApprovals);

// GET /api/buyer-checker
router.get('/buyer-checker', getApprovedBuyers);

// POST /api/buyers/send-otp
router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    await sendOTP(phoneNumber);
    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
});

export default router;