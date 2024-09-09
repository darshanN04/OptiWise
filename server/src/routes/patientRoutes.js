import express from 'express';
import { getAllPatientDetails } from '../controllers/patientController.js';

const router = express.Router();



router.get('/patients/details', getAllPatientDetails);

export default router;
