import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/OrganizerDashboard/Dashboard'; 
// 👇 Import your existing Discover component
import MyEvents from './pages/OrganizerDashboard/MyEvents';
import Discover from "./components/organizer_discover/discover"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss'; 
import Inbox from './pages/OrganizerDashboard/Inbox';

// Placeholder components for pages you might not have yet
const Profile = () => <div>Profile Page</div>;
const CreateEvent = () => <div>Create New Event Form</div>;

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* Main Dashboard route */}
            <Route path="/" element={<Dashboard />} /> 
            
            {/* The Discover route, mapping the path to your component */}
            <Route path="/discover" element={<Discover />} /> 
            
            {/* Other routes */}
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/inbox" element={<Inbox />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;