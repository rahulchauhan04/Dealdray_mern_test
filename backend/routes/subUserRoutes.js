import express from 'express';
import {
  getBuyerRegistrations,
  approveBuyerRegistration,
  rejectBuyerRegistration,
} from '../controllers/subUserController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to protect all routes in this router
router.use(protect);

// Apply role-based authorization to allow only 'BOT Checker' and 'BOT Approval Agent'
router.use(authorizeRoles('BOT Checker', 'BOT Approval Agent'));

// Define the route to get buyer registrations
router.get('/buyer-registrations', getBuyerRegistrations);

// Define the route to approve a buyer registration
router.post('/buyer-registrations/:id/approve', approveBuyerRegistration);

// Define the route to reject a buyer registration
router.post('/buyer-registrations/:id/reject', rejectBuyerRegistration);

// Define the route to get bot checker registrations
router.get('/bot-checker/registrations', getBuyerRegistrations);

export default router;
