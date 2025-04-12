import express from 'express';
import { registerTruck } from '../controllers/truck.controllers.js';
// import {setHeaders} from "../middleware/middleware.js"


const router = express.Router();


router.post('/truck', registerTruck);

export default router;