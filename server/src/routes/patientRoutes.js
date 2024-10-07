import express from 'express';
import { getAllPatientDetails, registerPatient, searchPatientByNameAndPhone ,getPatientNameById,getPatientWithDetails} from '../controllers/patientController.js';

const router = express.Router();



router.get('/patients/details', getAllPatientDetails);
router.get('/patients/search', searchPatientByNameAndPhone);
router.post('/patients/register', registerPatient);
router.get('/patients/:patientId', getPatientWithDetails);
router.get('/patients/name/:patientId', getPatientNameById);

export default router;
