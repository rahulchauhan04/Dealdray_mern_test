import express from 'express';
import { loginBuyerWithOTP, verifyBuyerOTP, approveBuyer, getPendingApprovals, getApprovedBuyers } from '../controllers/buyerController.js';

const router = express.Router();

console.log('Buyer Routes Loaded'); // Debug log

// POST /api/buyers/login
router.post('/login', loginBuyerWithOTP);

// POST /api/buyers/verify-otp
router.post('/verify-otp', verifyBuyerOTP);

// POST /api/buyer-approvals/approve
router.post('/buyer-approvals/approve', approveBuyer);

// GET /api/buyer-approvals
router.get('/buyer-approvals', getPendingApprovals);

// GET /api/buyer-checker
router.get('/buyer-checker', getApprovedBuyers);

export default router;