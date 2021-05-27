import express from 'express';
import {addOrderItems} from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router();


router.route('/').post(authMiddleware,addOrderItems);


export default router;