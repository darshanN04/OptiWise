import { supabase } from '../db/supabaseClient.js';

const getAllPatientDetails = async (req, res) => {
    try {
        const { data: patients, error: patientError } = await supabase.from('patient').select('*');
        if (patientError) throw patientError;
        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: 'No patients found' });
        }
        const { data: additionalDetails, error: additionalError } = await supabase.from('additional_details').select('*');
        if (additionalError) throw additionalError;
        const combinedData = patients.map(patient => {
            const additional = additionalDetails.find(add => add.patient_id === patient.patient_id) || {};
            return { ...patient, ...additional };
        });

        res.json(combinedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const searchPatientByNameAndPhone = async (req, res) => {
    const { name, phone_no } = req.query;
    try {
        if (!name && !phone_no) {
            return res.status(400).json({ message: 'At least one of name or phone number is required' });
        }
        const cleanedPhoneNo = phone_no ? phone_no.replace(/[^\d]/g, '') : null;
        let query = supabase.from('patient').select('*');
        if (name) {
            query = query.ilike('name', `%${name}%`);
        }
        if (cleanedPhoneNo) {
            query = query.eq('phone_no', cleanedPhoneNo);
        }
        const { data: patients, error } = await query;
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: 'No patients found' });
        }
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const registerPatient = async (req, res) => {
    console.log(req.body);
    const {
      name,
      dob,
      gender,
      aadhaar_no,
      phone_no,
      occupation,
      address,
      father_name,
      photograph,
      email,
      emergency_name,
      emergency_phone,
      emergency_relation
    } = req.body;
    
    try {
      // Call the Supabase function 'patient_registration' with all the parameters
      const { data: patient_id, error } = await supabase.rpc('patient_registration', {
        p_name: name,
        p_dob: dob,
        p_gender: gender,
        p_aadhaar_no: aadhaar_no,
        p_phone_no: phone_no,
        p_occupation: occupation,
        p_address: address,
        p_father_name: father_name,
        p_photograph: photograph,
        p_email: email,
        p_e_name: emergency_name,
        p_e_phone: emergency_phone,
        p_e_relation: emergency_relation
      });
      console.log(error);
      if (error) throw error;
  
      if (patient_id === -1) {
        return res.status(400).json({ message: 'Patient already exists' });
      }
  
      // Return success message with patient_id
      res.status(200).json({ message: 'Patient registered successfully', patient_id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getPatientWithDetails = async (req, res) => {
    const { patientId } = req.params;
    const { data, error } = await supabase
        .from('patient') 
        .select(`
            *,
            additional_details (
                email,
                medical_history,
                current_medication,
                allergies,
                emergency_name,
                emergency_phone,
                emergency_relation,
                next_appointment
            )
        `) 
        .eq('patient_id', patientId) 
        .single();


    if (!data) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json(data); 
};

const getPatientNameById = async (req, res) => {
    const { patientId } = req.params;
    const { data, error } = await supabase
        .from('patient')
        .select('name') // Select only the name field
        .eq('patient_id', patientId)
        .single(); 

    if (error || !data) {
        console.error('Error fetching patient name:', error);
        return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json({ name: data.name }); // Return the patient name
};


export { getAllPatientDetails, searchPatientByNameAndPhone ,registerPatient,getPatientWithDetails,getPatientNameById}
