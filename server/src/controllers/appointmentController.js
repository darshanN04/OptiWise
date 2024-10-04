import { supabase } from '../db/supabaseClient.js';

const createAppointment = async (req, res) => {
    try {
        const { patient_id, reason } = req.body;

        if (!patient_id || !reason) {
            return res.status(400).json({ error: 'Patient ID and reason are required.' });
        }
        const { data, error } = await supabase.rpc('create_appointment', {
            p_id: patient_id,
            p_reason: reason,
        });

        if (error) {
            throw error;
        }

        return res.status(200).json({ token: data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const clearAppointments = async (req, res) => {
  try {
    const { error } = await supabase.rpc('clear_appointments');
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Appointments cleared successfully via function.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTokens = async (req, res) => {
  try {
      const { data, error } = await supabase.rpc('get_tokens_ordered'); 

      if (error) {
          throw error; 
      }
      return res.status(200).json({ tokens: data });
  } catch (error) {
      return res.status(500).json({ error: error.message }); 
  }
};

const getPatientIdFromToken = async (req, res) => {
  const { token } = req.query; // Use query instead of params

  try {
    const { data, error } = await supabase
      .from('appointment')
      .select('patient_id')
      .eq('token', token);

    if (error) {
      return res.status(400).json({ message: 'Error retrieving patient ID', error });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Patient not found for this token' });
    }
    res.status(200).json({ patient_id: data[0].patient_id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export { clearAppointments, createAppointment,getAllTokens,getPatientIdFromToken }
