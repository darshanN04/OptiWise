import express from 'express';
import { getAllPatientDetails, registerPatient, searchPatientByNameAndPhone ,getPatientWithDetails} from '../controllers/patientController.js';

const router = express.Router();



router.get('/patients/details', getAllPatientDetails);
router.get('/patients/search', searchPatientByNameAndPhone);
router.post('/patients/register', registerPatient);
router.get('/patients/:patientId', getPatientWithDetails);

export default router;
