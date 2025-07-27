require("dotenv").config();
const { createClient } = require('@supabase/supabase-js');

// Supabase client initialization
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ----------------------------
// REGISTER
// ----------------------------
async function registerUser(req, res) {
  const { email, password, fullName } = req.body;

  try {
    // Sign up the user using Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName } // stores in user_metadata
      }
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({
      message: 'User registered. Please check your email to confirm.',
      user: data.user
    });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// ----------------------------
// LOGIN
// ----------------------------
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    res.status(200).json({
      message: 'Login successful',
      user: data.user,
      session: data.session // contains access_token, refresh_token, etc.
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// ----------------------------
// FORGOT PASSWORD
// ----------------------------
async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password' // change to your frontend URL
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      message: 'Password reset email sent'
    });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {
  registerUser,
  login,
  forgotPassword
};
