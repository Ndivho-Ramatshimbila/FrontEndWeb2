
import { useNavigate } from 'react-router-dom';
import "../../styles/auth-style/WelcomePage.scss";


function HomePage() {
  const navigate = useNavigate();
  return (  
    <div className="welcome-page">
      <nav className="navbar">
                 
           </nav>
      <h1>Welcome to Event<br/>Handler system!</h1>
      <p>Your gateway to campus events, bookings and <br/>community connections at Tshwane University of<br/>Technology.</p>
     <button onClick={() => navigate("/login")} >
      Get Started
    </button>
    
    </div>
  );
} 
export default HomePage;