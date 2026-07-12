const { supabase } = require('../config/supabase');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role || 'technician'
        }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const token = jwt.sign({ userId: data.user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      user: data.user,
      session: data.session,
      token
    });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const token = jwt.sign({ userId: data.user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({
      user: data.user,
      session: data.session,
      token
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const signOut = async (req, res) => {
  try {
    await supabase.auth.signOut();
    res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Sign out error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signUp, signIn, signOut };
