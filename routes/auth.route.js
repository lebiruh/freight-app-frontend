import express from 'express';
import { logIn, registerClient, registerTruckOwner } from '../controllers/auth.controllers.js';
// import {setHeaders} from "../middleware/middleware.js"


const router = express.Router();


router.post('/client/register', registerClient);
router.post('/truck-owner/register', registerTruckOwner);
router.post('/login', logIn);
// router.post('/logout', logOut);

export default router;