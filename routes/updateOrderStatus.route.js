import express from 'express';
import { updateOrderStatus } from '../controllers/order.controllers.js';
// import { updateTruckAvailability } from '../controllers/truck.controllers.js';
// import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


router.patch('/update-status', updateOrderStatus);

export default router;