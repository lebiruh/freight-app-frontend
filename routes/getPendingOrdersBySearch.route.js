import express from 'express';
import { getPendingFreightOrdersBySearch } from '../controllers/order.controllers.js';
// import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


router.get('/search', getPendingFreightOrdersBySearch);

export default router;