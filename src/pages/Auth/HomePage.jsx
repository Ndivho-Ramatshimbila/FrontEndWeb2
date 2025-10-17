import logo from '../../assets/images/tut_logo.png';

import { useNavigate } from 'react-router-dom';
import "../../styles/abstracts-auth/WelcomePage.scss"; // ✅ If stored in src/styles


function HomePage() {
  const navigate = useNavigate();
  return (  
    <div className="welcome-page">
      <nav className="navbar">
                 <img src={logo} alt="Logo" />
           </nav>
      <h1>Welcome to Event<br/>Handler system!</h1>
      <p>Your ultimate guide to campus Events.Discover.<br/>register and engage with everything happening<br/>at Tut</p>
     <button onClick={() => navigate("/login")} >
      Get Started
    </button>
    
    </div>
  );
} 
export default HomePage;