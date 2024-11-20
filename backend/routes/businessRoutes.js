import express from 'express';
import { getBusinesses, createBusiness } from '../controllers/businessController.js'; // Use relative path

const router = express.Router();

// Multer Configuration for File Upload
import multer from 'multer';

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

export default router;