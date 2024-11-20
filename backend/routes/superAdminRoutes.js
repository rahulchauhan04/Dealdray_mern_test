import express from 'express';
import { createSubUser, getSubUsers, updateSubUser, deleteSubUser } from '../controllers/superAdminController.js';
import { authenticateSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/super-admin/sub-users
router.post('/sub-users', authenticateSuperAdmin, createSubUser);

// GET /api/super-admin/sub-users
router.get('/sub-users', authenticateSuperAdmin, getSubUsers);

// PUT /api/super-admin/sub-users/:id
router.put('/sub-users/:id', authenticateSuperAdmin, updateSubUser);

// DELETE /api/super-admin/sub-users/:id
router.delete('/sub-users/:id', authenticateSuperAdmin, deleteSubUser);

export default router;