import express from 'express';
import { loginBuyerWithOTP } from '../controllers/buyerController.js';

const router = express.Router();

// POST /api/buyers/login
router.post('/login', loginBuyerWithOTP);

export default router;