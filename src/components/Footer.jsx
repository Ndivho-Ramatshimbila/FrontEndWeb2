import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import "../styles/abstracts/Footer.scss";

export default function Footer() {
  const campuses = {
    polokwane: { lat: -23.9045, lng: 29.4584 },
    emalahleni: { lat: -25.876, lng: 29.2335 },
  };

  const openDirections = (campus) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${campus.lat},${campus.lng}&travelmode=driving`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <Mail className="icon" />
              <a href="mailto:eventsupport@tut.ac.za">
                eventsupport@tut.ac.za
              </a>
            </li>
            <li>
              <Phone className="icon" />
              <a href="tel:+27123456789">+27 12 345 6789</a>
            </li>
            <li className="clickable" onClick={() => openDirections(campuses.polokwane)}>
              <MapPin className="icon" />
              <span className="link-text">Polokwane Campus, South Africa</span>
            </li>
            <li className="clickable" onClick={() => openDirections(campuses.emalahleni)}>
              <MapPin className="icon" />
              <span className="link-text">Emalahleni Campus, South Africa</span>
            </li>
          </ul>

          {/* Social Media */}
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/TshwaneUniversityofTechnology/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="social-icon" />
            </a>
            <a
              href="https://twitter.com/Official_TUT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="social-icon" />
            </a>
            <a
              href="https://www.linkedin.com/school/tshwane-university-of-technology/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="social-icon" />
            </a>
            <a
              href="https://www.instagram.com/tut_official2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="social-icon" />
            </a>
          </div>
        </div>

        {/* Attendee Links */}
        <div className="footer-section">
          <h3 className="footer-heading">For Attendees</h3>
          <ul className="footer-links">
            <li><a href="/attendee">Attendee Dashboard</a></li>
            <li><a href="/attendee/my-events">Upcoming Events</a></li>
            <li><a href="/attendee/qr-code">My Tickets</a></li>
            <li><a href="/attendee/rate-events">Submit Feedback</a></li>
          </ul>
        </div>

        {/* Organizer Links */}
        <div className="footer-section">
          <h3 className="footer-heading">For Organizers</h3>
          <ul className="footer-links">
            <li><a href="/create-event">Create Event</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright Smart Event System. All Rights Reserved.</p>
        <p>Designed by TUT ICEP TEAM 2025</p>
      </div>
    </footer>
  );
}
