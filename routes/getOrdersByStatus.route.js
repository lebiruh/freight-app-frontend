import express from 'express';
import { getFreightOrdersByStatus } from '../controllers/order.controllers.js';



const router = express.Router();

router.get('/:status', getFreightOrdersByStatus);

export default router;