import express from 'express';
import { getFreightOrdersSalesData } from '../controllers/order.controllers.js';



const router = express.Router();

router.get('/:status', getFreightOrdersSalesData);

export default router;