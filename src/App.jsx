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

const Profile = () => <div>Profile Page</div>;

/* ---------------- AUTH LAYOUT (no sidebar) ---------------- */
function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      {children}
    </div>
  );
}

/* ---------------- DASHBOARD LAYOUT (with sidebar) ---------------- */
function DashboardLayout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}

/* ---------------- APP ROUTES ---------------- */
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- AUTH ROUTES (independent) ---------- */}
        <Route
          path="/"
          element={
            <AuthLayout>
              <HomePage />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          }
        />

        {/* ---------- DASHBOARD ROUTES (with sidebar) ---------- */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/discover"
          element={
            <DashboardLayout>
              <Discover />
            </DashboardLayout>
          }
        />
        <Route
          path="/my-events"
          element={
            <DashboardLayout>
              <MyEvents />
            </DashboardLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          }
        />
        <Route
          path="/create-event"
          element={
            <DashboardLayout>
              <CreateEvent />
            </DashboardLayout>
          }
        />
        <Route
          path="/inbox"
          element={
            <DashboardLayout>
              <Inbox />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
