import express from 'express';
import { getAllTrucks } from '../controllers/registerTruck.controllers.js';
// import {setHeaders} from "../middleware/middleware.js"


const router = express.Router();


router.post('/truck', getAllTrucks);

export default router;