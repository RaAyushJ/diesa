// src/pages/Dashboard.jsx
import React from 'react';
import TopBar from '../components/TopBar';
import TopicsSection from '../components/TopicsSection';
import { Container } from 'react-bootstrap';

function Dashboard() {
  // Example static user object; later replace this with Supabase-authenticated user info
  const user = {
    name: "Ayush", // ✅ Replace with dynamic data from Supabase later
    profilePic: "/default-profile.png"
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      {/* Header Bar with User Info */}
      <TopBar user={user} />

      {/* Main Content Area */}
      <Container className="py-4">
        <h2 className="mb-3">Today's Goal</h2>
        <ul>
          <li>✅ Complete 5 questions</li>
          <li>📚 Revise 2 topics</li>
        </ul>

        {/* Dynamic Daily Topics */}
        <TopicsSection />

        {/* 🔧 Future: Add Notes, Backlog, Quizzes, etc. */}
      </Container>
    </div>
  );
}

export default Dashboard;
