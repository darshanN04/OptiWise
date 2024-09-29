import express from 'express';
import { loginDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/doctor/login', loginDoctor);

export default router;
