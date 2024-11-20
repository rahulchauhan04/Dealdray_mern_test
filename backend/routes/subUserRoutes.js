import express from 'express';
import { getBuyerRegistrations, approveBuyerRegistration, rejectBuyerRegistration } from '../controllers/subUserController.js';
import { authenticateSubUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware
router.use(authenticateSubUser);

// Route to get buyer registrations
router.get('/buyer-registrations', getBuyerRegistrations);

// POST /api/sub-users/buyer-registrations/:id/approve
router.post('/buyer-registrations/:id/approve', approveBuyerRegistration);

// POST /api/sub-users/buyer-registrations/:id/reject
router.post('/buyer-registrations/:id/reject', rejectBuyerRegistration);

export default router;
