import express from 'express';
import { getUserByRole } from '../controllers/userByRole.controllers.js';
// import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


router.get('/users/:role', getUserByRole);

export default router;