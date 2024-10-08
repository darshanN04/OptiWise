import express from 'express';
import { loginDoctor,logoutDoctor,getDoctorProfile,getDoctorId,getDoctorsid } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/doctor/login', loginDoctor);
router.post('/doctor/logout', logoutDoctor);
router.get('/doctor/profile',getDoctorProfile);
router.get('/doctor/roleID',getDoctorId);
router.get('/doctor/doctorsid',getDoctorsid);



export default router;
