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


export { clearAppointments, createAppointment }
