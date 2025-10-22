import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Organizer Layouts/Pages
import Dashboard from './pages/OrganizerDashboard/Dashboard';
import MyEvents from './pages/OrganizerDashboard/MyEvents';
import Discover from "./components/organizer_discover/discover";
import Inbox from './pages/OrganizerDashboard/Inbox';
import ProfilePage from './pages/OrganizerDashboard/ProfilePage';
import CreateEvent from './pages/OrganizerDashboard/CreateEvent';
import ConfirmEventDetails from './pages/OrganizerDashboard/ConfirmEventDetails';
import OrganizerEventRating from './pages/OrganizerDashboard/EventRating';
import EventDetails from './pages/OrganizerDashboard/EventDetails';

// Admin Pages
import AnalyticsDashboard from './pages/AdminDashboard/AnalyticsDashboard';
import AnalyticsExportScreen from './pages/AdminDashboard/AnalyticsExportScreen';
import AdminProfilePage from './pages/AdminDashboard/AdminProfilePage';
import AdminLayout from './layouts/AdminLayout';
import ApprovedScreen from './pages/AdminDashboard/ApprovalScreen';
import AdminEventDetails from './pages/AdminDashboard/AdminEventDetails';
import AdminChat from './pages/AdminDashboard/AdminChat';

// Attendee Pages
import AttendeeLayout from './layouts/AttendeeLayout';
import Events from './pages/AttendeeDashBoard/Events';
import SportsEvents from './pages/AttendeeDashBoard/SportsEvents';
import AttendeeProfilePage from './pages/AttendeeDashBoard/AttendeeProfilePage';
import AttendeeEventRating from './pages/AttendeeDashBoard/EventRating';
import CheckInScreen from './pages/AttendeeDashBoard/CheckInScreen';
import AttendeeDiscover from './components/attendee_discover/attendee-discover';
import AttendeeEventDetails from './pages/AttendeeDashboard/EventDetails';
import EventRegistration from "./pages/AttendeeDashBoard/EventRegistration";

// Auth Pages
import HomePage from './pages/Auth/HomePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Styles
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import './styles/abstracts/profile.scss';

/* ---------------- LAYOUT COMPONENTS ---------------- */

// Layout for auth pages (no sidebar/footer)
function AuthLayout({ children }) {
  return <div className="auth-layout">{children}</div>;
}

// Layout for organizer dashboard pages
function DashboardLayout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  );
}

// Optional: Fallback 404 page
function NotFound() {
  return <h2 className="text-center mt-5">404 - Page Not Found</h2>;
}

/* ---------------- MAIN APP ROUTER ---------------- */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- AUTH ROUTES ---------- */}
        <Route path="/" element={<AuthLayout><HomePage /></AuthLayout>} />
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

        {/* ---------- ORGANIZER DASHBOARD ROUTES ---------- */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/discover" element={<DashboardLayout><Discover /></DashboardLayout>} />
        <Route path="/my-events" element={<DashboardLayout><MyEvents /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
        <Route path="/create-event" element={<DashboardLayout><CreateEvent /></DashboardLayout>} />
        <Route path="/confirm-event" element={<DashboardLayout><ConfirmEventDetails /></DashboardLayout>} />
        <Route path="/inbox" element={<DashboardLayout><Inbox /></DashboardLayout>} />
        <Route path="/rate-your-event" element={<DashboardLayout><OrganizerEventRating /></DashboardLayout>} />

        {/* ✅ View Event Details */}
        <Route path="/event/:id" element={<DashboardLayout><EventDetails /></DashboardLayout>} />

        {/* ✅ Edit Event Page (REQUIRED for `navigate('/event/:id/edit')`) */}
        <Route path="/event/:id/edit" element={<DashboardLayout><CreateEvent mode="edit" /></DashboardLayout>} />


        {/* ---------- ADMIN ROUTES (Nested) ---------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AnalyticsDashboard />} />
          <Route path="export" element={<AnalyticsExportScreen />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="approvals" element={<ApprovedScreen />} />
          <Route path="details/:id" element={<AdminEventDetails />} />
          <Route path="/admin/chat" element={<AdminChat />} />
        </Route>

        {/* ---------- ATTENDEE ROUTES (Nested) ---------- */}
        <Route path="/attendee" element={<AttendeeLayout />}>
        <Route index element={<AttendeeDiscover />} />
        <Route path="events-profile" element={<AttendeeProfilePage />} />
        <Route path="rate-events" element={<AttendeeEventRating />} />
        <Route path="sports" element={<SportsEvents />} />
        <Route path="my-events" element={<Events />} />
        <Route path="qr-code" element={<CheckInScreen />} />
        <Route path="/attendee/event-registration" element={<EventRegistration />} />
        <Route path="view-event/:id" element={<AttendeeEventDetails />} />
        </Route>


        {/* ---------- 404 FALLBACK ---------- */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
