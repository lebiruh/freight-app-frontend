import express from 'express';
import {addFreightOrder} from '../controllers/order.controllers.js';

const router = express.Router();

router.post('/add-order', addFreightOrder);

export default router;