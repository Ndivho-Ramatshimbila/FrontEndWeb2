import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/OrganizerDashboard/Dashboard'; 
import MyEvents from './pages/OrganizerDashboard/MyEvents';
import Discover from "./components/organizer_discover/discover"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss'; 
import './styles/abstracts/profile.scss'; 
import Inbox from './pages/OrganizerDashboard/Inbox';
import HomePage from './pages/Auth/HomePage.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx'; 
import ProfilePage from './pages/OrganizerDashboard/ProfilePage.jsx';
import CreateEvent from './pages/OrganizerDashboard/CreateEvent.jsx';
import ConfirmEventDetails from './pages/OrganizerDashboard/ConfirmEventDetails.jsx';
import Footer from './components/Footer';
import AnalyticsDashboard from './pages/AdminDashboard/AnalyticsDashboard.jsx';
import AttendeeLayout from './layouts/AttendeeLayout.jsx';
import AllEvents from './pages/AttendeeDashBoard/AllEvents.jsx';
import SportsEvents from './pages/AttendeeDashBoard/SportsEvents.jsx';

/* ---------------- AUTH LAYOUT (no sidebar, no footer) ---------------- */
function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      {children}
    </div>
  );
}

/* ---------------- DASHBOARD LAYOUT (with sidebar + footer) ---------------- */
function DashboardLayout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">{children}</div>
      <Footer /> {/* ✅ Footer only on dashboard pages */}
    </div>
  );
}

/* ---------------- APP ROUTES ---------------- */
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- AUTH ROUTES ---------- */}
        <Route path="/" element={<AuthLayout><HomePage /></AuthLayout>} />
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

        {/* ---------- DASHBOARD ROUTES ---------- */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/discover" element={<DashboardLayout><Discover /></DashboardLayout>} />
        <Route path="/my-events" element={<DashboardLayout><MyEvents /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
        <Route path="/create-event" element={<DashboardLayout><CreateEvent /></DashboardLayout>} />
        <Route path="/inbox" element={<DashboardLayout><Inbox /></DashboardLayout>} />
        <Route path="/confirm-event" element={<DashboardLayout><ConfirmEventDetails /></DashboardLayout>} />

        <Route path="/admin" element={<DashboardLayout><AnalyticsDashboard /></DashboardLayout>} />


        <Route path="/attendee" element={<AttendeeLayout />} >
            
            <Route index element={<AllEvents />} />
            <Route path="sports" element={<SportsEvents />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
