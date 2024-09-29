import express from 'express';
import { loginDoctor,logoutDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/doctor/login', loginDoctor);
router.post('/doctor/logout', logoutDoctor);

export default router;
