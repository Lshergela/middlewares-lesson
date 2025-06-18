import express from 'express';

import {
  createUser,
  getAllUser,
  getUserById,
  loginUser,
} from '../controllers/userController.js';
import { createUserMiddleware } from '../middlewares/userMiddleware.js';

const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', createUserMiddleware, createUser);
router.post('/login', loginUser);

export default router;
