import express from 'express';
import multer from 'multer';
import { getBusinesses, createBusiness } from '/Users/rahul/Developer/backend/backend/controllers/businessController.js';

const router = express.Router();

// Multer Configuration for File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/', getBusinesses);
router.post('/', upload.array('documents', 20), createBusiness);

export default router; // Ensure this is a default export