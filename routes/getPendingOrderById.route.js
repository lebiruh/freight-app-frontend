import express from 'express';
import { getPendingFreightOrderById } from '../controllers/order.controllers.js';
// import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


router.get('/pending/:jobId', getPendingFreightOrderById);

export default router;