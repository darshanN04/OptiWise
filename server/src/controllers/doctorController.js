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
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logoutDoctor = async (req, res) => {
    console.log('Logout request received');
    try {
      const { error } = await supabase.auth.signOut();
      console.log('Supabase signOut error:', error);
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      res.status(200).json({
        message: 'Doctor logged out successfully',
      });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: error.message });
    }
  };
  

export { loginDoctor, logoutDoctor };
