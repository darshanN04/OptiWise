import { supabase } from '../db/supabaseClient.js';

const loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email, password }); // Log request

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Login error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    const accessToken = data.session.access_token;
    const userEmail = data.user.email;
    
    console.log('Login successful:', { accessToken, userEmail });
    
    res.status(200).json({
      message: 'Doctor login successful',
      accessToken,
      email: userEmail,
    });
  } catch (error) {
    console.log('Server error:', error.message);
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
