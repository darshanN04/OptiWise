import { supabase } from '../db/supabaseClient.js';

const getAllPatientDetails = async (req, res) => {
    try {
        //Patients
        const { data: patients, error: patientError } = await supabase.from('patient').select('*');

        if (patientError) throw patientError;
        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: 'No user exists' });
        }

        const { data: patientAdditional, error: additionalError } = await supabase.from('patient_additional').select('*');
        if (additionalError) throw additionalError;
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




export { getAllPatientDetails, searchPatientByNameAndPhone }
