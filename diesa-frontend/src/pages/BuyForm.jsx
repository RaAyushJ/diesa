import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { supabase } from '../supabaseClient'; // Import your Supabase client

function BuyForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'basic' // Default plan
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 1. Get the current authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError('You must be logged in to purchase a course.');
      setTimeout(() => navigate('/login'), 2000); 
      return;
    }

    // --- TEMPORARY FIX: Ensure profile exists before enrollment ---
    // In a production app, this should be handled by a Supabase Edge Function
    // or Database Trigger on 'auth.users' creation.
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') { // PGRST116 means 'no rows found'
        console.log('Profile not found for user, creating one...');
        const { error: insertProfileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: user.email,
              full_name: formData.name || user.user_metadata.fullName || 'New User', // Corrected to full_name
            }
          ]);

        if (insertProfileError) {
          console.error('Error creating profile:', insertProfileError);
          setError('Failed to create user profile. Please try again.');
          return;
        }
        console.log('Profile created successfully.');
      } else if (profileError) {
        console.error('Error checking profile:', profileError);
        setError('Failed to verify user profile. Please try again.');
        return;
      }
    } catch (profileCatchError) {
      console.error('Unexpected error during profile check/creation:', profileCatchError);
      setError('An unexpected error occurred with your profile. Please try again.');
      return;
    }
    // --- END TEMPORARY FIX ---

    // 2. Simulate a successful payment and create an enrollment record in Supabase
    try {
      const { error: enrollmentError } = await supabase
        .from('Enrollment') // Ensure this matches your table name in Supabase
        .insert([
          {
            user_id: user.id, // Corrected to user_id
            course_id: 1, // Already correct
            purchase_date: new Date().toISOString(), // Already correct
            start_date: new Date().toISOString(), // Already correct
            plan_type: formData.plan === 'premium' ? 'weekday_centric' : 'weekday_centric', // Already correct
            status: 'active', // Already correct
            payment_id: 'MOCK_PAYMENT_' + Date.now(), // Already correct
          }
        ]);

      if (enrollmentError) {
        console.error('Supabase Enrollment Insert Error:', enrollmentError);
        console.error('Full Enrollment Error Object:', enrollmentError); 
        setError('Failed to record purchase. Please try again.');
        return;
      }

      setSuccess('✅ Payment simulated and course purchased! Redirecting to Dashboard...');
      localStorage.removeItem('hasPurchasedCourse'); 

      setTimeout(() => navigate('/dashboard'), 2000);

    } catch (err) {
      console.error('Purchase process error (unexpected):', err);
      setError('An unexpected error occurred during purchase.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 bg-dark text-white" style={{ width: '26rem' }}>
        <h3 className="text-center mb-4">Course Purchase</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Choose a Plan</Form.Label>
            <Form.Select name="plan" value={formData.plan} onChange={handleChange}>
              <option value="basic">Basic - ₹0 (Trial)</option>
              <option value="premium">Premium - ₹499</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="w-100 btn-success">Proceed</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default BuyForm;
