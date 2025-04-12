import express from 'express';
import { updateTruckAvailability } from '../controllers/truck.controllers.js';
// import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


router.patch('/truck/:truckId', updateTruckAvailability);

export default router;