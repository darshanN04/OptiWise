import express from 'express';
import { createAppointment,clearAppointments } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/appointments/create', createAppointment);
router.delete('/appointments/clear', clearAppointments);

export default router;
