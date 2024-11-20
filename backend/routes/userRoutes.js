import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '/Users/rahul/Developer/backend/backend/controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router; // Ensure this is a default export