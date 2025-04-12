import express from 'express';
import { getAvailableTrucksByType } from '../controllers/truck.controllers.js';
// import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


router.get('/trucks/:truckType', getAvailableTrucksByType);

export default router;