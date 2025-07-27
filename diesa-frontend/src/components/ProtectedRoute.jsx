import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading'); // 'loading', 'unauthenticated', 'not-enrolled', 'authorized'

  useEffect(() => {
    const checkAccess = async () => {
      console.log('ProtectedRoute: Checking access...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      const user = session?.user;

      if (sessionError) {
        console.error('ProtectedRoute: Error getting session:', sessionError);
        setStatus('unauthenticated');
        return;
      }

      if (!user) {
        console.log('ProtectedRoute: No active session found, redirecting to login.');
        setStatus('unauthenticated');
        return;
      }

      console.log('ProtectedRoute: User authenticated:', user.id, user.email);

      // ✅ Check if the user has an active enrollment in the 'Enrollment' table
      try {
        const { data: enrollments, error: enrollmentError } = await supabase
          .from('Enrollment') // Ensure this matches your table name in Supabase
          .select('status')
          .eq('user_id', user.id) // ✅ Changed from 'userId' to 'user_id' to match your Supabase schema
          .eq('status', 'active'); // Only if status is 'active'

        if (enrollmentError) {
          console.error('ProtectedRoute: Supabase Enrollment Check Error:', enrollmentError);
          // Treat as unauthenticated or not-enrolled if there's a DB error
          setStatus('unauthenticated'); 
          return;
        }

        console.log('ProtectedRoute: Enrollment data received:', enrollments);

        if (enrollments && enrollments.length > 0) {
          console.log('ProtectedRoute: User has active enrollment, authorizing access.');
          setStatus('authorized');
        } else {
          console.log('ProtectedRoute: User has no active enrollment, redirecting to buy form.');
          setStatus('not-enrolled');
        }
      } catch (err) {
        console.error('ProtectedRoute: Unexpected error checking enrollment:', err);
        setStatus('unauthenticated'); // Handle unexpected errors during check
      }
    };

    checkAccess();

    // Optional: Listen for auth state changes to re-check access dynamically
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('ProtectedRoute: Auth state changed, re-checking access. Event:', _event, 'Session:', session);
      checkAccess();
    });

    // Cleanup listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };

  }, []); // Empty dependency array means this effect runs once on mount and cleans up

  // Render based on status
  if (status === 'loading') {
    return <div>Loading access...</div>; // More explicit loading state
  }
  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }
  if (status === 'not-enrolled') {
    return <Navigate to="/buy-form" replace />;
  }

  return children; // Render the protected component
}

export default ProtectedRoute;
