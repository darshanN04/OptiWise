import express from 'express';
import { createAppointment,clearAppointments,getAllTokens,getPatientIdFromToken } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/appointments/create', createAppointment);
router.delete('/appointments/clear', clearAppointments);
router.get('/appointments/tokens', getAllTokens);
router.get('/appointments/patientid', getPatientIdFromToken);

export default router;
