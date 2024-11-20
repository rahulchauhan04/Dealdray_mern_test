import express from 'express';
import { createSubUser } from '../controllers/superAdminController.js';
import { authenticateSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/super-admin/sub-users
router.post('/sub-users', authenticateSuperAdmin, createSubUser);

export default router;