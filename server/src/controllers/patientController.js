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
  
  const searchPatientByNameAndPhone = async (req, res) => {
    const { name, phone_no } = req.query;

    console.log('Received Name:', name);
    console.log('Received Phone No:', phone_no);

    try {
        
        if (!name || !phone_no) {
            return res.status(400).json({ message: 'Name and phone number are required' });
        }

        const { data: patients, error } = await supabase
            .from('patient')
            .select('*')
            .eq('name', name)
            .eq('phone_no', phone_no);

        
        if (error) {
            console.error('Supabase Error:', error.message); 
            return res.status(500).json({ error: error.message });
        }
        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: 'No patients found' });
        }

        
        res.json(patients);
    } catch (error) {
        console.error('Internal Server Error:', error.message); 
        res.status(500).json({ error: error.message });
    }
};

  
  
  

export {getAllPatientDetails,searchPatientByNameAndPhone}
