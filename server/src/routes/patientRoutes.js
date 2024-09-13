import express from 'express';
import { getAllPatientDetails, registerPatient, searchPatientByNameAndPhone } from '../controllers/patientController.js';

const router = express.Router();



router.get('/patients/details', getAllPatientDetails);
router.get('/patients/search', searchPatientByNameAndPhone);
router.post('/patients/register', registerPatient);

export default router;
