import express from 'express';
import { loginBuyerWithOTP, verifyBuyerOTP } from '../controllers/buyerController.js';

const router = express.Router();

console.log('Buyer Routes Loaded'); // Debug log

// POST /api/buyers/login
router.post('/login', loginBuyerWithOTP);

// POST /api/buyers/verify-otp
router.post('/verify-otp', verifyBuyerOTP);

export default router;