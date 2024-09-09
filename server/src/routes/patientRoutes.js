import express from 'express';
import { getAllPatientDetails, searchPatientByNameAndPhone } from '../controllers/patientController.js';

const router = express.Router();



router.get('/patients/details', getAllPatientDetails);
router.get('/patients/search', searchPatientByNameAndPhone);

export default router;
