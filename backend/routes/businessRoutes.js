import express from 'express';
import multer from 'multer';
import {
  getBusinesses,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} from '../controllers/businessController.js';

// Initialize router
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filenames
  },
});

const upload = multer({ storage });

// Routes

// 1. Get all businesses
router.get('/', getBusinesses);

// 2. Create a new business (with file uploads)
router.post('/', upload.array('documents', 10), createBusiness);

// 3. Update an existing business by ID (with file uploads)
router.put('/:id', upload.array('documents', 10), updateBusiness);

// 4. Delete a business by ID
router.delete('/:id', deleteBusiness);

export default router;