import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import ProtectedRoute from './pages/Auth/ProtectedRoute';
import Unauthorized from './pages/Auth/Unauthorized';

// Lazy load Organizer Layouts/Pages
const Dashboard = lazy(() => import('./pages/OrganizerDashboard/Dashboard'));
const MyEvents = lazy(() => import('./pages/OrganizerDashboard/MyEvents'));
const Discover = lazy(() => import('./components/organizer_discover/discover'));
const Inbox = lazy(() => import('./pages/OrganizerDashboard/Inbox'));
const ProfilePage = lazy(() => import('./pages/OrganizerDashboard/ProfilePage'));
const CreateEvent = lazy(() => import('./pages/OrganizerDashboard/CreateEvent'));
const ConfirmEventDetails = lazy(() => import('./pages/OrganizerDashboard/ConfirmEventDetails'));
const OrganizerEventRating = lazy(() => import('./pages/OrganizerDashboard/EventRating'));
const EventDetails = lazy(() => import('./pages/OrganizerDashboard/EventDetails'));
const ModifyForm = lazy(() => import('./pages/OrganizerDashboard/ModifyForm'));
const EventDetailsModify = lazy(() => import('./pages/OrganizerDashboard/EventDetailsModify'));
const ConfirmModifiedDetails = lazy(() => import('./pages/OrganizerDashboard/ConfirmModifiedDetails'));
const RegisterForEvent = lazy(() => import('./pages/OrganizerDashboard/RegisterForEvent'));

// Lazy load Admin Pages
const AnalyticsDashboard = lazy(() => import('./pages/AdminDashboard/AnalyticsDashboard'));
const AnalyticsExportScreen = lazy(() => import('./pages/AdminDashboard/AnalyticsExportScreen'));
const AdminProfilePage = lazy(() => import('./pages/AdminDashboard/AdminProfilePage'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const ApprovedScreen = lazy(() => import('./pages/AdminDashboard/ApprovalScreen'));
const AdminEventDetails = lazy(() => import('./pages/AdminDashboard/AdminEventDetails'));
const AdminChat = lazy(() => import('./pages/AdminDashboard/AdminChat'));
const AvailableVenues = lazy(() => import('./pages/AdminDashboard/AvailableVenues'));
const AdminCalendar = lazy(() => import('./pages/AdminDashboard/AdminCalendar'));
const UserManagement = lazy(() => import('./pages/AdminDashboard/UserManagement'));
const EventManagement = lazy(() => import('./pages/AdminDashboard/EventManagement'));

// Lazy load Attendee Pages
const AttendeeLayout = lazy(() => import('./layouts/AttendeeLayout'));
const Events = lazy(() => import('./pages/AttendeeDashBoard/Events'));
const SportsEvents = lazy(() => import('./pages/AttendeeDashBoard/SportsEvents'));
const AttendeeProfilePage = lazy(() => import('./pages/AttendeeDashBoard/AttendeeProfilePage'));
const AttendeeEventRating = lazy(() => import('./pages/AttendeeDashBoard/EventRating'));
const CheckInScreen = lazy(() => import('./pages/AttendeeDashBoard/CheckInScreen'));
const AttendeeDiscover = lazy(() => import('./components/attendee_discover/attendee-discover'));
const AttendeeEventDetails = lazy(() => import('./pages/AttendeeDashBoard/EventDetails'));
const AttendeeRegisterForEvent = lazy(() => import('./pages/AttendeeDashBoard/RegisterForEvent'));
const ViewEventDetails = lazy(() => import('./pages/AttendeeDashBoard/ViewEventDetails'));

// Lazy load Auth Pages
const HomePage = lazy(() => import('./pages/Auth/HomePage'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));

// Styles
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import './styles/abstracts/profile.scss';

/* ---------------- LAYOUT COMPONENTS ---------------- */

function AuthLayout({ children }) {
  return <div className="auth-layout">{children}</div>;
}

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout-container">
      <Sidebar />
      <div className="dashboard-main-wrapper">
        <div className="dashboard-content-area">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function NotFound() {
  return <h2 className="text-center mt-5">404 - Page Not Found</h2>;
}

function LoadingFallback() {
  return (
    <div className="loading-container">
      <i className="fas fa-spinner fa-spin"></i>
      <p>Loading...</p>
    </div>
  );
}

/* ---------------- MAIN APP ROUTER ---------------- */

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>

          {/* ---------- AUTH ROUTES ---------- */}
          <Route path="/" element={<AuthLayout><HomePage /></AuthLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ---------- ORGANIZER DASHBOARD ROUTES ---------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><Dashboard /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/discover"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><Discover /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-events"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><MyEvents /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><ProfilePage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><CreateEvent /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm-event"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><ConfirmEventDetails /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><Inbox /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/rate-your-event"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><OrganizerEventRating /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer-view-event/:id"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><RegisterForEvent /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/event/:id"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><EventDetails /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-details-modify/:id"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><EventDetailsModify /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm-modified-details"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><ConfirmModifiedDetails /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/modify-event"
            element={
              <ProtectedRoute allowedRoles={['ORGANIZER']}>
                <DashboardLayout><ModifyForm /></DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* ---------- ADMIN ROUTES ---------- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AnalyticsDashboard />} />
            <Route path="export" element={<AnalyticsExportScreen />} />
            <Route path="profile" element={<AdminProfilePage />} />
            <Route path="approvals" element={<ApprovedScreen />} />
            <Route path="details/:id" element={<AdminEventDetails />} />
            <Route path="chat" element={<AdminChat />} />
            <Route path="add-venue" element={<AvailableVenues />} />
            <Route path="calendar" element={<AdminCalendar />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="event-management" element={<EventManagement />} />
          </Route>

          {/* ---------- ATTENDEE ROUTES ---------- */}
          <Route
            path="/attendee"
            element={
              <ProtectedRoute allowedRoles={['ATTENDEE']}>
                <AttendeeLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AttendeeDiscover />} />
            <Route path="events-profile" element={<AttendeeProfilePage />} />
            <Route path="rate-events" element={<AttendeeEventRating />} />
            <Route path="sports" element={<SportsEvents />} />
            <Route path="my-events" element={<Events />} />
            <Route path="qr-code" element={<CheckInScreen />} />
            <Route path="view-event/:id" element={<AttendeeEventDetails />} />
            <Route path="register/:id" element={<AttendeeRegisterForEvent />} />
            <Route path="view-event-details" element={<ViewEventDetails />} />
          </Route>

          {/* ---------- 404 FALLBACK ---------- */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
