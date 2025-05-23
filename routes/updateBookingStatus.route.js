import express from 'express';
import { updateBookingStatus, updateOrderStatus } from '../controllers/order.controllers.js';
// import { updateTruckAvailability } from '../controllers/truck.controllers.js';
// import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


// router.patch('/update-status', updateOrderStatus);

router.patch('/update-booking/status', updateBookingStatus);

export default router;