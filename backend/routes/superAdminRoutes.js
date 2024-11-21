import express from 'express';
import { createSubUser, getSubUsers, getSubUserById, updateSubUser, deleteSubUser } from '../controllers/superAdminController.js';
import { authenticateSuperAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js'; // Configure multer in this middleware

const router = express.Router();

// POST /api/super-admin/sub-users
router.post('/sub-users', authenticateSuperAdmin, upload.single('image'), createSubUser);

// GET /api/super-admin/sub-users
router.get('/sub-users', authenticateSuperAdmin, getSubUsers);

// GET /api/super-admin/sub-users/:id
router.get('/sub-users/:id', authenticateSuperAdmin, getSubUserById);

// PUT /api/super-admin/sub-users/:id
router.put('/sub-users/:id', upload.single('image'), updateSubUser);

// DELETE /api/super-admin/sub-users/:id
router.delete('/sub-users/:id', authenticateSuperAdmin, deleteSubUser);

export default router;