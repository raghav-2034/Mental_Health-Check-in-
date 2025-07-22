import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Meditation from './pages/Meditation';
import MoodTracker from './pages/MoodTracker';
import QuickAssessment from './pages/QuickAssessment';
import StressIndicator from './pages/StressIndicator';
import CommunitySupport from './pages/CommunitySupport';
import WellnessActivities from './pages/WellnessActivities';
import Resources from './pages/Resources';
import AnalyseMood from './pages/AnalyseMood';
import MentalAnalysis from './pages/MentalAnalysis';
import SelfCarePlanner from './pages/SelfCarePlanner';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="/quick-assessment" element={<QuickAssessment />} />
            <Route path="/stress-indicator" element={<StressIndicator />} />
            <Route path="/community-support" element={<CommunitySupport />} />
            <Route path="/wellness-activities" element={<WellnessActivities />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/analyse-mood" element={<AnalyseMood />} />
            <Route path="/mental-analysis" element={<MentalAnalysis />} />
            <Route path="/self-care-planner" element={<SelfCarePlanner />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;