import { supabase } from '../db/supabaseClient.js';

const createAppointment = async (req, res) => {
  const { patient_id, reason } = req.body;
  try {
      const { data: latestTokenData, error: fetchError } = await supabase
          .from('appointmentaa')
          .select('token')
          .order('token', { ascending: false })
          .limit(1); 
      if (fetchError) {
          return res.status(500).json({ error: fetchError.message });
      }
      const nextToken = latestTokenData && latestTokenData.length > 0 ? latestTokenData[0].token + 1 : 1;
      const { data, error } = await supabase
          .from('appointmentaa')
          .insert([{ patient_id, reason, created_at: new Date().toISOString(), token: nextToken }])
          .select(); 

      if (error) {
          return res.status(500).json({ error: error.message });
      }
      res.status(201).json({
          appointment: {
              TOKEN_NO: nextToken,
              reason: reason
          }
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
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


export {clearAppointments,createAppointment}
