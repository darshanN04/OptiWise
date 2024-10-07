import { supabase } from '../db/supabaseClient.js';

const getPrescriptionIds = async (req, res) => {
    const { patient_id } = req.params;

    if (!patient_id) {
        return res.status(400).json({ error: 'Patient ID is required' });
    }
    const { data, error } = await supabase.rpc('display_prescription_id', { p_id: patient_id });

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ message: 'No prescriptions found for this patient' });
    }

    return res.status(200).json({ prescription_ids: data });
};
const getPrescriptionById = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const { data, error } = await supabase
        .from('prescription')
        .select('*')
        .eq('id', id) 
        .single(); 
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      if (!data) {
        return res.status(404).json({ message: 'Prescription not found' });
      }
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: 'Server error', details: err.message });
    }
  };
const getPrescriptionDetails = async (req, res) => {
    const { id } = req.params; // Get the prescription ID from request parameters

    try {
        // Fetch the prescription details
        const { data: prescription, error: prescriptionError } = await supabase
            .from('prescription')
            .select('*') // You can specify the fields you need here
            .eq('id', id)
            .single(); // We expect a single result

        if (prescriptionError || !prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        // Extract left and right eye IDs
        const { left_eye_id, right_eye_id } = prescription;

        // Fetch left eye details
        const { data: leftEye, error: leftEyeError } = await supabase
            .from('left_eye')
            .select('*')
            .eq('id', left_eye_id)
            .single();

        if (leftEyeError) {
            return res.status(404).json({ error: 'Left eye details not found' });
        }

        // Fetch right eye details
        const { data: rightEye, error: rightEyeError } = await supabase
            .from('right_eye')
            .select('*')
            .eq('id', right_eye_id)
            .single();

        if (rightEyeError) {
            return res.status(404).json({ error: 'Right eye details not found' });
        }

        // Combine the results
        const result = {
            prescription,
            leftEye,
            rightEye,
        };

        // Return the combined result
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: 'Server error', details: err.message });
    }
};


export { getPrescriptionIds,getPrescriptionById,getPrescriptionDetails} 