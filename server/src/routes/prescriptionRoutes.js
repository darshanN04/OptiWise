import express from 'express';
import { getPrescriptionIds,getPrescriptionById,getPrescriptionDetails,addPrescription,updateMedicalDetails } from '../controllers/prescriptionController.js';
const router = express.Router();

router.get('/prescriptions/patient/:patient_id', getPrescriptionIds);
router.get('/prescriptions/prescription/:id', getPrescriptionById);
router.get('/prescription/:id', getPrescriptionDetails);
router.post('/prescriptions/add', addPrescription);
router.post('/prescriptions/updateMedicalDetails', updateMedicalDetails);

export default router;
