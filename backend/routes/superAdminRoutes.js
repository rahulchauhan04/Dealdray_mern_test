import express from 'express';
import SubUser from '../models/SubUser.js'; // Import the SubUser model
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

// PUT /api/super-admin/sub-users/:id/activate-deactivate
router.put('/sub-users/:id/activate-deactivate', authenticateSuperAdmin, async (req, res) => {
  try {
    const subUser = await SubUser.findById(req.params.id);
    if (!subUser) {
      return res.status(404).json({ message: "SubUser not found" });
    }
    subUser.isActive = !subUser.isActive;
    await subUser.save();
    res.status(200).json({ subUser, message: `User ${subUser.isActive ? "activated" : "deactivated"} successfully.` });
  } catch (error) {
    console.error("Error toggling user status:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;