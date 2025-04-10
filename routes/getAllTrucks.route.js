import express from 'express';
import { getAllTrucks } from '../controllers/registerTruck.controllers.js';
// import { logIn, registerClient, registerTruckOwner } from '../controllers/auth.controllers.js';
// import {setHeaders} from "../middleware/middleware.js"


const router = express.Router();

router.get('/all', getAllTrucks);
;

export default router;