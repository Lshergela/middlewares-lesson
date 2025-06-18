import express from 'express'
import { createProduct, getAllProducts } from '../controllers/productController.js';
import { authMiddleware } from '../middlewares/productMiddleware.js';


const router = express.Router()

router.get('/', authMiddleware, getAllProducts);
router.post('/', createProduct);

export default router