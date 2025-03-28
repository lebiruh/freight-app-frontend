import express from 'express';
import { getPendingFreightOrders } from '../controllers/order.controllers.js';



const router = express.Router();

router.get('/pending', getPendingFreightOrders);

export default router;