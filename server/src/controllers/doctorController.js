import { supabase } from '../db/supabaseClient.js';

const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: 'Doctor login successful',
      user: data.user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { loginDoctor };
