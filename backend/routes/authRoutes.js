import express from 'express';
import { loginSuperAdmin, loginSubUser } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', loginSuperAdmin);

// POST /api/auth/sub-user-login
router.post('/sub-user-login', loginSubUser);

export default router;