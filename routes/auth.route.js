import express from 'express';
import { logIn } from '../controllers/auth.controllers.js';
// import {setHeaders} from "../middleware/middleware.js"


const router = express.Router();


// router.post('/register', register);
router.post('/login', logIn);
// router.post('/logout', logOut);

export default router;