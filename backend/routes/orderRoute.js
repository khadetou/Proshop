import express from 'express';
import {addOrderItems, getOrderById, updateOrderToPaid, getOrders, deleteProduct} from '../controllers/orderController.js';
import authMiddleware,{isAdmin} from '../middleware/authMiddleware.js';


const router = express.Router();


router.route('/').post(authMiddleware,addOrderItems);
router.route('/myorders').get(authMiddleware, getOrders);
router.route('/myorders/:id').delete(authMiddleware, isAdmin, deleteProduct);
router.route('/:id').get(authMiddleware,getOrderById)


router.route('/:id/paid').put(authMiddleware,updateOrderToPaid);



export default router;