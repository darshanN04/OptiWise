import express from 'express';
import { loginDoctor,logoutDoctor,getDoctorProfile } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/doctor/login', loginDoctor);
router.post('/doctor/logout', logoutDoctor);
router.get('/doctor/profile',getDoctorProfile);



export default router;
