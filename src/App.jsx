import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/WelcomePage/HomePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard/OrganizerDashboard';
import AttendeeDashboard from './pages/AttendeeDasboard/AttendeeDashboard';

function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgotPassword/>} />
         <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/attendee-dashboard" element={<AttendeeDashboard />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>

   

    </Router>
  );
}

export default App;
