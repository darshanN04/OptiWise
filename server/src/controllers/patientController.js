import { supabase } from '../db/supabaseClient.js';

const getAllPatientDetails = async (req, res) => {
    try {
      //Patients
      const { data: patients, error: patientError } = await supabase.from('patient').select('*');
      if (patientError) throw patientError;
  
      // If no patients are found
      if (!patients || patients.length === 0) {
        return res.status(404).json({ message: 'No user exists' });
      }
  
      //Additional patient details
      const { data: patientAdditional, error: additionalError } = await supabase.from('patient_additional').select('*');
      if (additionalError) throw additionalError;
  
      //Combine 
      const combinedData = patients.map(patient => {
        const additionalDetails = patientAdditional.find(add => add.patient_id === patient.patient_id) || {};
        return { ...patient, ...additionalDetails };
      });
  
      res.json(combinedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  

export {getAllPatientDetails}
